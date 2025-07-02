import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

import GetEventByIdAPI from "../api/Services/Eventapi/GetEventById";
import GetPrevComment from "../api/Services/Eventapi/GetPrevComment";
// import { createOrderAPI } from "../api/Services/PaymentAPI/CreateOrderApi";
// import { verifyPaymentAPI } from "../api/Services/PaymentAPI/verifyPayment";
import { loadRazorpayScript } from '../Utils/loadRazorpay';
import axios from "axios";

function EventDetail() {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [ticketCount, setTicketCount] = useState(1);
  const socketRef = useRef(null);

  const { user } = useSelector((state) => state.profile);
  const isCommentAndBookingAllowed = user && user.role !== "Admin" && user.role !== "Organiser";

  // Socket setup
  useEffect(() => {
    if (!user) return;

    socketRef.current = io(process.env.REACT_APP_SOCKET_URL, {
      transports: ["websocket"],
      withCredentials: true,
    });

    socketRef.current.on("connect", () => {
      console.log("Socket connected:", socketRef.current.id);
    });

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, [user]);

  // Fetch event and comments (comments only if logged in)
  useEffect(() => {
    const fetchEventAndComments = async () => {
      try {
        const data = await GetEventByIdAPI(id);
        if (data) setEventData(data);
        else toast.error("Error fetching event data");

        if (user) {
          const previousComments = await GetPrevComment(id);
          const enriched = (previousComments || []).map((c) => ({
            ...c,
            isOwn: c.senderId?.toString() === user._id?.toString(),
          }));
          setComments(enriched.sort((a, b) => new Date(a.time) - new Date(b.time)));
        }
      } catch (err) {
        toast.error("Error fetching event or comments");
        console.error(err);
      }
    };

    if (id) fetchEventAndComments();
  }, [id, user]);

  // Real-time comments
  useEffect(() => {
    if (!socketRef.current || !user) return;

    const eventName = `receive-comment:${id}`;
    const handleNewComment = (comment) => {
      const enriched = {
        ...comment,
        isOwn: comment.senderId?.toString() === user._id?.toString(),
      };
      setComments((prev) => [...prev, enriched]);
    };

    socketRef.current.on(eventName, handleNewComment);
    return () => socketRef.current.off(eventName, handleNewComment);
  }, [id, user]);

  // Modal scroll fix
  useEffect(() => {
    document.body.style.overflow = showPaymentModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showPaymentModal]);

  const handleCommentSubmit = () => {
    if (newComment.trim() && user) {
      const commentObj = {
        comment: newComment,
        time: new Date(),
        firstName: user?.firstName,
        email: user?.email,
        senderId: user?._id,
        eventId: id,
        isOwn: true,
      };
      socketRef.current.emit("new-comment", commentObj);
      setComments((prev) => [...prev, commentObj]);
      setNewComment("");
    }
  };

const handlePayment = async () => {
  try{
        const res = await loadRazorpayScript();

        if (!res) {
            alert("Razorpay SDK failed to load");
            return;
        }

        // 1. Create order on backend
        const orderRes = await axios.post("https://eventbookingbackend.onrender.com/eventbookingweb/payment", {
            eventid:id // Rs. 500
        });

      const { amount, order_id, currency } = orderRes.data.order;

        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID,
          amount: amount,
          currency: currency,
          order_id: order_id,
          name: "Testing 1",
          description: "Test Transaction",
          method: "upi",
          handler: function (response) {
            toast.success("Your event ticket is in your dashboard!");
            setShowPaymentModal(false);
          },

          prefill: {
            name: "John Doe",
            email: "john@example.com",
            contact: "9999999999",
          },
          theme: {
            color: "#3399cc",
          },
        };

      const rzp = new window.Razorpay(options);
      rzp.open();

      } 
      
       catch (err) {
      console.error("Payment error", err);
      toast.error("Error starting payment");
    }
  }; 


  if (!eventData) return <div className="text-white p-8">Loading event...</div>;

  return (
    <div className="bg-black min-h-screen text-white px-4 py-6 md:px-16 mt-5 md:pt-10 relative">
      <div className="md:hidden mb-4">
        <img src={eventData.image} alt={eventData.name} className="w-full h-48 object-cover rounded-lg" />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <div className="hidden md:block mb-4">
            <img src={eventData.image} alt={eventData.name} className="w-full h-64 object-cover rounded-lg" />
          </div>

          <h1 className="text-3xl font-bold text-center md:text-left mb-4 text-blue-400">
            {eventData.name}
          </h1>

          <div className="space-y-3 text-base pl-2 md:pl-6">
            <p><span className="text-blue-400 font-semibold">Date:</span> {eventData.date}</p>
            <p><span className="text-blue-400 font-semibold">Venue:</span> {eventData.venue}</p>
            <p><span className="text-blue-400 font-semibold">Price:</span> ₹{eventData.price || "Free"}</p>
            <p><span className="text-blue-400 font-semibold">Category:</span> {eventData.category?.category || "N/A"}</p>
            <p><span className="text-blue-400 font-semibold">Description:</span> {eventData.description}</p>
          </div>

          <div className="flex justify-center mt-10">
            <button
              className={`${
                isCommentAndBookingAllowed ? "bg-blue-800 hover:bg-blue-900" : "bg-gray-500 cursor-not-allowed"
              } text-white font-semibold px-10 py-3 rounded-full transition-all`}
              onClick={() => {
                if (!isCommentAndBookingAllowed) {
                  toast.error("Please login as a regular user to book the event.");
                } else {
                  setShowPaymentModal(true);
                }
              }}
            >
              Book Now
            </button>
          </div>

          <div className="md:hidden mt-10">
            <CommentsSection
              comments={comments}
              user={user}
              isCommentAndBookingAllowed={isCommentAndBookingAllowed}
              newComment={newComment}
              setNewComment={setNewComment}
              handleCommentSubmit={handleCommentSubmit}
            />
          </div>
        </div>

        <div className="hidden md:block md:w-1/2">
          <CommentsSection
            comments={comments}
            user={user}
            isCommentAndBookingAllowed={isCommentAndBookingAllowed}
            newComment={newComment}
            setNewComment={setNewComment}
            handleCommentSubmit={handleCommentSubmit}
          />
        </div>
      </div>

      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-lg w-80 shadow-lg">
            <h2 className="text-xl font-bold mb-4"># Book Tickets</h2>
            <p className="mb-2">Event: <strong>{eventData.name}</strong></p>
            <p className="mb-2">Price per ticket: ₹{eventData.price}</p>
            <label className="block mb-4">
              Tickets:
              <input
                type="number"
                value={ticketCount}
                min={1}
                onChange={(e) => setTicketCount(Number(e.target.value))}
                className="ml-2 px-2 py-1 border rounded w-16"
              />
            </label>
            <p className="mb-4 font-semibold">Total: ₹{eventData.price * ticketCount}</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowPaymentModal(false)} className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">
                Cancel
              </button>
              <button onClick={handlePayment} className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CommentsSection({ comments, user, isCommentAndBookingAllowed, newComment, setNewComment, handleCommentSubmit }) {
  const scrollRef = useRef();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [comments]);

  return (
    <>
      <h2 className="text-xl font-semibold mb-2 text-blue-400">💬 Live Comments</h2>
      <div
        ref={scrollRef}
        className="bg-white/10 backdrop-blur p-4 rounded-lg mb-4 h-64 md:h-[75vh] overflow-y-auto space-y-2 text-sm"
      >
        {comments.length === 0 ? (
          <p className="text-gray-400">No comments yet.</p>
        ) : (
          comments.map((c, idx) => (
            <div key={idx} className={`flex ${c.isOwn ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs p-2 rounded-md ${
                  c.isOwn ? "bg-blue-600 text-white text-right" : "bg-white/20 text-white"
                }`}
              >
                {!c.isOwn && <p className="text-xs text-gray-300 font-medium">{c.firstName}</p>}
                <p>{c.comment}</p>
                <p className="text-xs text-gray-400 mt-1">{new Date(c.time).toLocaleTimeString()}</p>
              </div>
            </div>
          ))
        )}
      </div>
      {user ? (
        isCommentAndBookingAllowed ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none"
            />
            <button
              onClick={handleCommentSubmit}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 text-white rounded-md"
            >
              Send
            </button>
          </div>
        ) : (
          <p className="text-gray-400 text-sm mt-2">Only regular users can comment.</p>
        )
      ) : (
        <p className="text-gray-400 text-sm mt-2">Login to add a comment.</p>
      )}
    </>
  );
}

export default EventDetail;

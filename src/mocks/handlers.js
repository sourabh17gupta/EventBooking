// src/mocks/handlers.js
import { http, HttpResponse } from 'msw';





const BASE_URL = 'http://localhost:4000'; // 👈 Make sure this matches your frontend BASE_URL

let mockUsers = [
  {
    _id: 'user1',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice@example.com',
    blocked: false,
    role: 'organiser',
  },
  {
    _id: 'user2',
    firstName: 'Bob',
    lastName: 'Smith',
    email: 'bob@example.com',
    blocked: false,
    role: 'attendee',
  },
  {
    _id: 'user3',
    firstName: 'Charlie',
    lastName: 'Brown',
    email: 'charlie@example.com',
    blocked: true,
    role: 'organiser',
  },
 
  
];
let mockOtpStore = {}; // Maps email -> otp

export const handlers = [
  // 🗺️ Nearby Events
  http.post(`${BASE_URL}/nearby-events`, async ({ request }) => {
    const { userLat, userLng } = await request.json();

    const categories = ['Sports', 'Workshop', 'Conferences', 'Concert'];
    const events = Array.from({ length: 8 }).map((_, i) => {
      const category = categories[i % categories.length];
      return {
        id: i + 1,
        name: `${category} Event ${i + 1}`,
        category,
        date: `2025-07-${(i + 10).toString().padStart(2, '0')}`,
        image: `https://picsum.photos/seed/${category + i}/300/200`,
        lat: userLat + (Math.random() - 0.5) * 0.02,
        lng: userLng + (Math.random() - 0.5) * 0.02,
      };
    });

    return HttpResponse.json(events);
  }),

  // 📩 Send OTP
  http.post(`${BASE_URL}/api/auth/send-otp`, async ({ request }) => {
    const { email } = await request.json();

    const otp = '123456';
    mockOtpStore[email] = otp;
    console.log(`🔐 OTP for ${email}: ${otp}`);

    return HttpResponse.json({
      success: true,
      message: 'OTP sent successfully',
    });
  }),

  // ✅ Verify OTP
  http.post(`${BASE_URL}/api/auth/verify-otp`, async ({ request }) => {
    const { email, otp } = await request.json();

    if (mockOtpStore[email] === otp) {
      return HttpResponse.json({
        success: true,
        message: 'OTP verified successfully',
      });
    }

    return HttpResponse.json(
      {
        success: false,
        message: 'Invalid OTP',
      },
      { status: 400 }
    );
  }),

  // 👤 Signup
  http.post(`${BASE_URL}/api/auth/signup`, async ({ request }) => {
    const { firstName, lastName, email, password, role } = await request.json();

    const userExists = mockUsers.find(user => user.email === email);
    if (userExists) {
      return HttpResponse.json(
        {
          success: false,
          message: 'User already exists',
        },
        { status: 409 }
      );
    }

    const newUser = { firstName, lastName, email, password, role,blocked: false };
    mockUsers.push(newUser);
    delete mockOtpStore[email];

    return HttpResponse.json({
      success: true,
      message: 'User registered successfully',
      user:newUser,
      token: 'MOCK_SIGNUP_TOKEN_123456',
    });
  }),

  // 🔐 Login
  http.post(`${BASE_URL}/api/auth/login`, async ({ request }) => {
    const { email, password } = await request.json();
    const user = mockUsers.find(u => u.email === email && u.password === password);

    if (user) {
      return HttpResponse.json({
        success: true,
        token: 'MOCK_LOGIN_TOKEN_123456',
        user,
      });
    }

    return HttpResponse.json(
      {
        success: false,
        message: 'Invalid email or password',
      },
      { status: 401 }
    );
  }),

  // 🛠️ Reset Password Token
  http.post(`${BASE_URL}/auth/reset-password-token`, async ({ request }) => {
    const { email } = await request.json();
    if (!mockUsers.find(u => u.email === email)) {
      return HttpResponse.json({ success: false, message: "Email not found" }, { status: 404 });
    }
    return HttpResponse.json({
      success: true,
      message: 'Password reset token sent (mock)',
    });
  }),

  // 🔁 Reset Password
  http.post(`${BASE_URL}/auth/reset-password`, async ({ request }) => {
    const { email, newPassword } = await request.json();
    const user = mockUsers.find(u => u.email === email);
    if (user) {
      user.password = newPassword;
      return HttpResponse.json({ success: true, message: 'Password updated (mock)' });
    }
    return HttpResponse.json({ success: false, message: 'User not found' }, { status: 404 });
  }),

  // Add this to handlers.js
  http.get(`${BASE_URL}/api/organiser/events`, async () => {
  const mockEvents = [
    {
      _id: 'event1',
      name: 'React Conference',
      date: new Date().toISOString(), // upcoming
      category: 'Tech' ,
      image: 'https://picsum.photos/300/200?random=1',
      attendessCount: 120,
      avgRated: 4.5,
    },
    {
      _id: 'event2',
      name: 'Node.js Workshop',
      date: new Date(Date.now() + 86400000 * 5).toISOString(), // past (5 days ago)
      category:'Workshop',
      image: 'https://picsum.photos/300/200?random=2',
      attendessCount: 80,
      avgRated: 4.2,
    },
    {
      _id: 'event3',
      name: 'Node.js Workshop',
      date: new Date(Date.now() + 86400000 * 4).toISOString(), // past (5 days ago)
      category:'Workshop' ,
      image: 'https://picsum.photos/300/200?random=2',
      attendessCount: 80,
      avgRated: 4.2,
    },
    {
      _id: 'event4',
      name: 'Node.js Workshop',
      date: new Date(Date.now() + 86400000 * 6).toISOString(), // past (5 days ago)
      category:'Workshop',
      image: 'https://picsum.photos/300/200?random=2',
      attendessCount: 80,
      avgRated: 4.2,
    },
    // Add more mock events as needed
  ];

  return HttpResponse.json({
    success: true,
    response: mockEvents,
  });
  }),


  // 🆕 Create Event (Mocked)
  http.post(`${BASE_URL}/api/organiser/create-event`, async ({ request }) => {
  const formData = await request.json();

  const mockCreatedEvent = {
    ...formData,
    _id: Math.random().toString(36).substring(2, 9),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  console.log('📦 Mock Create Event Received:', formData);

  return HttpResponse.json({
    success: true,
    message: 'Mock event created successfully',
    data: mockCreatedEvent,
  });
}),

// 🧑 Get All Organisers

  http.get(`${BASE_URL}/api/admin/get-all-organiser`, () => {
    const organisers = mockUsers.filter(
      user => user.role === 'organiser'
    );
    return HttpResponse.json({
      success: true,
      data: organisers,
    });
  }),

  // 🧑‍🤝‍🧑 Get All Attendees
  http.get(`${BASE_URL}/api/admin/get-all-attendee`, () => {
    const attendees = mockUsers.filter(
      user => user.role === 'attendee'
    );
    return HttpResponse.json({
      success: true,
      data: attendees,
    });
  }),

  // 🚫 Block User
  http.post(`${BASE_URL}/api/admin/block-user`, async ({ request }) => {
    const { id } = await request.json();

    const user = mockUsers.find(u => u._id === id);
    if (user) {
      user.blocked = true;
      return HttpResponse.json({ success: true, message: 'User blocked' });
    } else {
      return HttpResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }
  }),

  // ✅ Unblock (if needed)
  http.post(`${BASE_URL}/api/v1/unblockuser`, async ({ request }) => {
    const { id } = await request.json();
    const user = mockUsers.find(u => u._id === id);
    if (user) {
      user.blocked = false;
      return HttpResponse.json({ success: true, message: 'User unblocked' });
    } else {
      return HttpResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }
  }),

  http.post(`${BASE_URL}/api/get-event-by-id`, async ({ request }) => {
    const { id } = await request.json();

    return HttpResponse.json({
      response: {
        id,
        name: `Mock Event for ID `,
        date: "2025-07-01",
        location: "New Delhi",
        price: 500,
        category: "Music",
        description: "Live music concert.",
        image: "https://picsum.photos/600/300?random=1"
      }
    });
  })

];

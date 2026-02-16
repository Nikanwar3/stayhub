const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description:
      "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1500,
    location: "Goa",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [73.8278, 15.4909],
    },
  },
  {
    title: "Modern Loft in Downtown",
    description:
      "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1200,
    location: "Mumbai",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [72.8777, 19.076],
    },
  },
  {
    title: "Mountain Retreat",
    description:
      "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 1800,
    location: "Manali",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [77.1892, 32.2432],
    },
  },
  {
    title: "Historic Villa in Rajasthan",
    description:
      "Experience the charm of Rajasthan in this beautifully restored historic villa. Explore the rich culture and heritage.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 2500,
    location: "Jaipur",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [75.7873, 26.9124],
    },
  },
  {
    title: "Lakeside Cottage",
    description:
      "Relax by the tranquil lake in this cozy cottage. Perfect for fishing and boating enthusiasts.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1300,
    location: "Nainital",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [79.4633, 29.3803],
    },
  },
  {
    title: "Luxury Penthouse with Pool",
    description:
      "Indulge in luxury living with panoramic city views from this stunning penthouse apartment.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 3500,
    location: "Bangalore",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [77.5946, 12.9716],
    },
  },
  {
    title: "Beach House Paradise",
    description:
      "Wake up to the sound of waves in this stunning beach house. Direct access to pristine beaches.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 2200,
    location: "Kerala",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [76.2711, 10.8505],
    },
  },
  {
    title: "Farmhouse with Garden",
    description:
      "Escape to the countryside in this peaceful farmhouse. Enjoy fresh air and organic farming.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 1600,
    location: "Pune",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [73.8567, 18.5204],
    },
  },
  // New interesting listings
  {
    title: "Luxury Treehouse Stay",
    description:
      "Experience nature like never before in this luxury treehouse. Features panoramic forest views and modern amenities.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 4500,
    location: "Munnar",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [77.0595, 10.0889],
    },
  },
  {
    title: "Traditional Houseboat",
    description:
      "Stay on the serene Dal Lake in this handcrafted wooden houseboat. Complete with Kashmiri cuisine and shikara rides.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1595846519845-68e298c2edd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 3200,
    location: "Srinagar",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [74.8715, 34.0935], // Coordinates for Srinagar
    },
  },
  {
    title: "Desert Glamping Experience",
    description:
      "Sleep under the stars in luxury tents. Enjoy camel safaris, folk music, and authentic Rajasthani dinners.",
    image: {
      filename: "listingimage",
      url: "https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 2800,
    location: "Jaisalmer",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [70.9083, 26.9157],
    },
  },
  {
    title: "Himalayan Stone Cottage",
    description:
      "A rustic stone cottage perched on a cliff edge with breathtaking views of the Nanda Devi peaks.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 2100,
    location: "Mukteshwar",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [79.6473, 29.4770], // Coordinates for Mukteshwar
    },
  },
  {
    title: "Eco-Friendly Mud House",
    description:
      "Sustainable living at its best. This mud house offers natural cooling and a grounding experience in the village.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1598928636135-d146006ff4be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 900,
    location: "Auroville",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [79.8078, 12.0067], // Coordinates for Auroville
    },
  },
];

module.exports = { data: sampleListings };


interface GalleryItem {
  type: 'image' | 'video';
  src: string;
  alt: string;
  thumbnail?: string;
}

// Sample gallery data - replace with your actual images
const villageGallery: GalleryItem[] = [
  { type: 'image', src: "/BUS STAND.jpg", alt: "Village Image 1" },
  { type: 'image', src: "/BUS STAND ROAD.jpg", alt: "Village Image 1" },
  { type: 'image', src: "/Hanuman Statue.jpg", alt: "Water surrounded by trees" },
  { type: 'image', src: "/VILLAGE START.jpg", alt: "Water surrounded by trees" },
  { type: 'image', src: "/Temple .jpg", alt: "Village Image 1" },
  { type: 'image', src: "/School.jpg", alt: "Village Image 2" },
  { type: 'image', src: "/Peerla chavidi 1.jpg", alt: "Village Image 3" },
  { type: 'image', src: "/Kasinayana Temple.jpg", alt: "River View" },
  

];

const festivalGallery: GalleryItem[] = [
  { type: 'image', src: "/gundam.jpg", alt: "Gundam" },
  { type: 'image', src: "/peerla chavidi.jpg", alt: "Peerla Chavidi" },
  { type: 'image', src: "/peerlu 1.jpg", alt: "Peerlu 1" },
  { type: 'image', src: "/Thangella Swamy And Brother.jpg", alt: "Thangella Swamy And Brother" },
  { type: 'image', src: "/pedda sarigesu 2.jpg", alt: "Pedda Sarigesu 2" },
  { type: 'image', src: "/pedda sarigesu 1.jpg", alt: "Pedda Sarigesu 1" },
  { type: 'image', src: "/Thangella Swamy.jpg", alt: "Thangella Swamy" }
];

const festivalVideos: GalleryItem[] = [
  { 
    type: 'video', 
    src: "/pedda sarigesu 1.mp4",
    alt: "Festival Video 1",
    thumbnail: "/pedda sarigesu 1.jpg"
  },
  { 
    type: 'video', 
    src: "/pedda sarigesu 3.mp4",
    alt: "Festival Video 2",
    thumbnail: "/pedda sarigesu image 4.jpg"
  },
  { 
    type: 'video', 
    src: "/pedda sarigesu 2.mp4",
    alt: "Festival Video 3",
    thumbnail: "/pedda sarigesu 2.jpg"
  }
];

export const galleryData = {
  village: villageGallery,
  festival: festivalGallery,
  videos: festivalVideos
};

export interface GalleryItem {
  type: 'image' | 'video';
  src: string;
  alt: string;
  thumbnail?: string; // Only used for videos
}

// 🏡 Village Gallery Images
const villageGallery: GalleryItem[] = [
  { type: 'image', src: "/BUS STAND.jpg", alt: "Bus Stand" },
  { type: 'image', src: "/BUS STAND ROAD.jpg", alt: "Bus Stand Road" },
  { type: 'image', src: "/Hanuman Statue.jpg", alt: "Hanuman Statue" },
  { type: 'image', src: "/VILLAGE START.jpg", alt: "Village Entrance" },
  { type: 'image', src: "/Temple.jpg", alt: "Temple View" },
  { type: 'image', src: "/School.jpg", alt: "Village School" },
  { type: 'image', src: "/Peerla chavidi 1.jpg", alt: "Peerla Chavidi Celebration" },
  { type: 'image', src: "/Kasinayana Temple.jpg", alt: "Kasinayana Temple" },
];

// 🎉 Festival Gallery Images
const festivalGallery: GalleryItem[] = [
  { type: 'image', src: "/gundam.jpg", alt: "Gundam Procession" },
  { type: 'image', src: "/peerla chavidi.jpg", alt: "Peerla Chavidi Gathering" },
  { type: 'image', src: "/peerlu 1.jpg", alt: "Peerlu Festival Crowd" },
  { type: 'image', src: "/Thangella Swamy And Brother.jpg", alt: "Thangella Swamy and Brother" },
  { type: 'image', src: "/pedda sarigesu 2.jpg", alt: "Pedda Sarigesu Ceremony 2" },
  { type: 'image', src: "/pedda sarigesu 1.jpg", alt: "Pedda Sarigesu Ceremony 1" },
  { type: 'image', src: "/Thangella Swamy.jpg", alt: "Thangella Swamy Portrait" },
];

// 🎥 Festival Videos
const festivalVideos: GalleryItem[] = [
  {
    type: 'video',
    src: "/pedda sarigesu 1.mp4",
    alt: "Pedda Sarigesu Video 1",
    thumbnail: "/pedda sarigesu 1.jpg"
  },
  {
    type: 'video',
    src: "/pedda sarigesu 3.mp4",
    alt: "Pedda Sarigesu Video 2",
    thumbnail: "/pedda sarigesu image 4.jpg"
  },
  {
    type: 'video',
    src: "/pedda sarigesu 2.mp4",
    alt: "Pedda Sarigesu Video 3",
    thumbnail: "/pedda sarigesu 2.jpg"
  }
];

// 📦 Final Export
export const galleryData = {
  village: villageGallery,
  festival: festivalGallery,
  videos: festivalVideos
};

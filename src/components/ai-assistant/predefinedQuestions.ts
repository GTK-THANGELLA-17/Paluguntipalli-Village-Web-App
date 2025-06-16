
import { PredefinedQuestion } from './types';

export const predefinedQuestions: PredefinedQuestion[] = [
  {
    id: '1',
    question: 'What is this application about?',
    answer: '🏛️ Welcome to the Paluguntipalli Village App! 🌟 This application showcases the rich cultural heritage of our beautiful village in Andhra Pradesh. 🏞️ You can explore our traditions, visit local businesses, take daily quizzes, share community stories, and stay updated with village events. ✨ It\'s your digital gateway to experiencing our village culture! 🚪💫',
    category: 'general',
    navigationOptions: [
      { label: 'Explore Gallery', sectionId: 'gallery', emoji: '📸' },
      { label: 'View Village Map', sectionId: 'village-map', emoji: '🗺️' }
    ]
  },
  {
    id: '2',
    question: 'What are the main features?',
    answer: '✨ Our app has amazing features! 🎯 You can take daily quizzes 🧩, explore our business directory 🏪, share community stories 📖, check weather updates 🌤️, view the village map 🗺️, and much more! 🌟 Each feature is designed to keep you connected with Paluguntipalli village culture. What would you like to explore first? 🚀',
    category: 'features',
    navigationOptions: [
      { label: 'Take Quiz', sectionId: 'quiz', emoji: '🧩' },
      { label: 'Browse Businesses', sectionId: 'business', emoji: '🏪' },
      { label: 'Read Stories', sectionId: 'community', emoji: '📖' }
    ]
  },
  {
    id: '3',
    question: 'How do I navigate the app?',
    answer: '🧭 Navigation is super easy! 🚀\n\n📱 Use the top navigation bar to switch between sections 🔄\n🔄 Scroll through the homepage to see all features 👆\n👆 Click on any feature card to explore that section 🎯\n🏠 Use the home button to return to the main page 🔙\n📍 The village map shows you around our beautiful locations 🗺️\n\nTip: The app works perfectly on all devices - mobile, tablet, and desktop! 📺📱💻',
    category: 'navigation',
    navigationOptions: [
      { label: 'Go to Home', sectionId: 'hero', emoji: '🏠' },
      { label: 'Open Village Map', sectionId: 'village-map', emoji: '🗺️' }
    ]
  },
  {
    id: '4',
    question: 'What are the benefits of using this app?',
    answer: '🎯 Amazing benefits await you: 🌟\n\n🤝 Stay Connected - Keep in touch with village community 👥\n📚 Learn & Grow - Discover our rich cultural heritage 🎓\n💼 Support Local - Find and support village businesses 🏪\n🎉 Never Miss Out - Get updates on all village events 📅\n🏆 Have Fun - Enjoy quizzes and interactive features 🎮\n📸 Preserve Memories - Access our beautiful photo gallery 💝\n🌍 Cultural Pride - Share our heritage with the world 🏆\n\nJoin our digital village community today! 🏘️✨🚀',
    category: 'benefits',
    navigationOptions: [
      { label: 'Join Community', sectionId: 'community', emoji: '🤝' },
      { label: 'View Gallery', sectionId: 'gallery', emoji: '📸' }
    ]
  },
  {
    id: '5',
    question: 'How do I contact support?',
    answer: '💬 Need help? We\'re here for you! 🤗\n\n📧 Use the Contact Form on our homepage 📝\n📱 Call our village representatives ☎️\n💌 Send us your questions anytime 📬\n🔧 Report issues through the contact section 🛠️\n\nOur community is always ready to help! 🙋‍♂️ We usually respond within 24 hours. 🕐✅💯',
    category: 'support',
    navigationOptions: [
      { label: 'Contact Us', sectionId: 'contact', emoji: '📧' }
    ]
  },
  {
    id: '6',
    question: 'Can I contribute to the community?',
    answer: '🌟 Absolutely! We love community participation: 🎊\n\n✍️ Share Your Stories - Submit community stories 📝\n📸 Share Photos - Contribute to our gallery 🖼️\n🏪 List Your Business - Add your business to our directory 💼\n🎯 Take Quizzes - Participate in daily knowledge tests 🧠\n📢 Share Events - Let us know about local events 🎪\n💡 Give Feedback - Help us improve the app 🔧\n\nEvery contribution makes our digital village stronger! 🤝💪🏘️',
    category: 'community',
    navigationOptions: [
      { label: 'Share Story', sectionId: 'community', emoji: '✍️' },
      { label: 'Add Business', sectionId: 'business', emoji: '🏪' },
      { label: 'Take Quiz', sectionId: 'quiz', emoji: '🎯' }
    ]
  }
];

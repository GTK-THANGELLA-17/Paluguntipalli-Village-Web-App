
import { NavigationOption } from './types';

export const generateAIResponse = (userInput: string): { content: string; navigationOptions?: NavigationOption[] } => {
  const input = userInput.toLowerCase();
  
  if (input.includes('feature') || input.includes('what can')) {
    return {
      content: '✨ Our app has amazing features! 🎯 You can take daily quizzes 🧩, explore our business directory 🏪, share community stories 📖, check weather updates 🌤️, view the village map 🗺️, and much more! 🌟 Each feature is designed to keep you connected with Paluguntipalli village culture. What would you like to explore first? 🚀',
      navigationOptions: [
        { label: 'Take Quiz', sectionId: 'quiz', emoji: '🧩' },
        { label: 'Browse Businesses', sectionId: 'business', emoji: '🏪' },
        { label: 'Read Stories', sectionId: 'community', emoji: '📖' }
      ]
    };
  }
  
  if (input.includes('quiz') || input.includes('test')) {
    return {
      content: '🧩 Our Daily Quiz is fantastic! 🏆 Test your knowledge about village history, culture, and traditions. 📚 New questions are added regularly, and you can track your progress. 📈 It\'s a fun way to learn more about Paluguntipalli! 🎓 Ready to take the challenge? 🚀',
      navigationOptions: [
        { label: 'Start Quiz', sectionId: 'quiz', emoji: '🧩' }
      ]
    };
  }
  
  if (input.includes('business') || input.includes('shop') || input.includes('service')) {
    return {
      content: '🏪 Our Business Directory helps you discover local businesses and services in Paluguntipalli! 🛍️ You can search by category, contact businesses directly, and support our local economy. 💼 From restaurants to services, everything you need is here! ✨💪',
      navigationOptions: [
        { label: 'Browse Businesses', sectionId: 'business', emoji: '🏪' }
      ]
    };
  }
  
  if (input.includes('story') || input.includes('community')) {
    return {
      content: '📖 Community Stories is where our village comes alive! 💝 Read heartwarming stories from fellow villagers, share your own experiences, and preserve our cultural heritage for future generations. 🏛️ Every story adds to our rich tapestry! ✨🎨',
      navigationOptions: [
        { label: 'Read Stories', sectionId: 'community', emoji: '📖' }
      ]
    };
  }
  
  if (input.includes('map') || input.includes('location') || input.includes('360')) {
    return {
      content: '🗺️ Our Interactive Village Map offers amazing 360° views! 🌍 Explore different locations, discover hidden gems, and take virtual tours of Paluguntipalli. 🚁 It\'s like being there in person! Perfect for planning visits or nostalgic exploration. ✨🏞️',
      navigationOptions: [
        { label: 'Explore Map', sectionId: 'village-map', emoji: '🗺️' }
      ]
    };
  }
  
  if (input.includes('weather')) {
    return {
      content: '🌤️ Stay updated with real-time weather information for Paluguntipalli! 🌡️ Check temperature, humidity, and forecasts to plan your day perfectly. ☀️ Never get caught off guard by weather changes! 🌧️⛅',
      navigationOptions: [
        { label: 'Check Weather', sectionId: 'village-weather', emoji: '🌤️' }
      ]
    };
  }
  
  if (input.includes('help') || input.includes('support')) {
    return {
      content: '💬 I\'m here to help! 🤗 You can ask me about any app features, navigation tips, or general questions about Paluguntipalli village. 📱 Feel free to use the contact form for detailed support, or just ask me anything! 💫 How can I assist you further? 🤝',
      navigationOptions: [
        { label: 'Contact Support', sectionId: 'contact', emoji: '📧' }
      ]
    };
  }
  
  if (input.includes('thank')) {
    return {
      content: '😊 You\'re very welcome! 💖 I\'m happy to help you explore our beautiful Paluguntipalli village app. 🏘️ Feel free to ask if you have any more questions! 💬 Enjoy discovering all the amazing features! 🌟✨'
    };
  }
  
  return {
    content: '🤔 That\'s an interesting question! 💭 While I try to help with everything about our Paluguntipalli village app, I might not have specific information about that. 📝 Feel free to explore the app features, check our predefined questions, or use the contact form for detailed inquiries. 💌 Is there something specific about the app I can help you with? ✨🎯'
  };
};

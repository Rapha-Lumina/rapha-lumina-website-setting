# Rapha Lumina - Spiritual Awakening & Consciousness Coaching

Official website for Rapha Lumina, guiding souls through spiritual transformation with psychology, quantum mechanics, and spiritual wisdom.

## 🌟 Features

- **Beautiful, Vibrant Design** - Reflecting your colourful energy and spiritual essence
- **AI-Powered Chatbot** - Claude API integration for instant spiritual guidance
- **Fully Responsive** - Perfect experience on all devices
- **SEO Optimised** - Built for search engine visibility
- **Fast Loading** - Optimised images and minimal dependencies
- **Interactive Elements** - Smooth scrolling, animations, and engaging UX

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **AI Integration**: Anthropic Claude API
- **Animations**: AOS (Animate On Scroll)
- **Hosting**: DigitalOcean App Platform
- **Version Control**: Git/GitHub

## 📁 Project Structure

```
raphalumina-website/
├── index.html              # Main HTML file
├── robots.txt              # SEO robots file
├── sitemap.xml             # SEO sitemap
├── css/
│   └── styles.css          # All styles
├── js/
│   └── main.js             # JavaScript & chatbot logic
└── images/
    ├── image_1.jpeg        # Your vibrant portrait
    ├── image_2.jpeg        # Transformation wave
    ├── image_3.png         # Meditation illustration
    ├── image_4.png         # Rapha Lumina logo
    └── image_5.png         # Spiritual landscape logo
```

## 🚀 Deployment

This website is deployed on **DigitalOcean App Platform**.

### Environment Variables Required:
- `CLAUDE_API_KEY` - Your Anthropic Claude API key

### Deployment Steps:
1. Push code to GitHub
2. Connect to DigitalOcean App Platform
3. Add CLAUDE_API_KEY environment variable
4. Deploy!

See `deployment-guide.md` for detailed instructions.

## 🎨 Colour Palette

The website uses vibrant colours inspired by your images:

- Primary Orange: `#FF9933`
- Primary Gold: `#FFB84D`
- Accent Blue: `#00A3E0`
- Accent Teal: `#00CED1`
- Accent Purple: `#9B59B6`
- Accent Pink: `#FF6B9D`

## 📱 Features

### Navigation
- Smooth scroll to sections
- Mobile-responsive hamburger menu
- Fixed navbar with transparency effects

### Hero Section
- Full-screen immersive experience
- Parallax background effect
- Prominent call-to-action buttons

### About Section
- Personal story and approach
- Feature highlights (Psychology, Quantum, Spiritual)
- Vibrant personal portrait

### Services
- Four main service offerings
- Detailed descriptions with bullet points
- Hover effects and animations

### Journey Timeline
- 5-step transformation process
- Visual timeline with numbers
- Clear progression path

### Chatbot Widget
- **Prominent floating button** with pulse animation
- Full-featured chat interface
- Claude API integration for spiritual guidance
- Conversation history maintained
- Mobile-optimised

### Contact Form
- Email and message submission
- Form validation
- Responsive design

## 🔧 Local Development

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/raphalumina-website.git
cd raphalumina-website
```

2. Open `index.html` in your browser or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js http-server
npx http-server
```

3. For chatbot to work locally, you'll need to add your Claude API key in `js/main.js` (remember to remove before committing!)

## 📈 SEO Features

- Semantic HTML5 structure
- Meta tags optimised for search and social
- Open Graph tags for social sharing
- Schema.org structured data (Person schema)
- XML sitemap
- robots.txt
- Fast page load speed
- Mobile-first responsive design
- Alt text on all images

## 🔒 Security

- API keys stored in environment variables (never in code)
- HTTPS enabled via DigitalOcean
- Input validation on forms
- XSS protection
- CORS policies

## 📊 Analytics Setup

To add Google Analytics:

1. Get your GA4 tracking ID
2. Add to `index.html` `<head>` section:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 🤝 Contributing

This is a personal website, but suggestions are welcome!

## 📝 License

© 2025 Rapha Lumina. All rights reserved.

## 📞 Contact

- **Website**: https://raphalumina.com
- **Email**: hello@raphalumina.com
- **Chat**: Use the website chatbot for instant guidance

## 🙏 Acknowledgments

- Built with love, light, and code ✨
- Powered by Anthropic's Claude AI
- Hosted on DigitalOcean
- Design inspired by spiritual awakening and vibrant energy

---

**May your journey be filled with light and transformation!** 🌟💫

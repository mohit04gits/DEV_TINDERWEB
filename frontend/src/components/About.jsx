const About = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-700 to-gray-900 text-white min-h-screen py-16">
      <section id="about" className="container mx-auto px-6 lg:px-20">
        
        {/* Header Section */}
        <div className="text-center mb-12 my-10">
          <h2 className="text-5xl font-extrabold text-white drop-shadow-lg">
            About <span className="text-blue-300">DevTinder</span>
          </h2>
          <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
            Where developers unite, collaborate, and innovate together! 🚀
          </p>
          <div className="w-24 h-1 bg-blue-400 mx-auto mt-4"></div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
              alt="Developers collaborating"
              className="rounded-3xl shadow-lg border-4 border-blue-400 transition-all duration-300 hover:scale-105 hover:shadow-blue-500"
            />
          </div>

          {/* Right Side - Content */}
          <div className="space-y-6">
            <h3 className="text-3xl font-semibold text-blue-300">
              Why DevTinder?
            </h3>
            <p className="text-lg text-gray-200 leading-relaxed">
              DevTinder is more than just a social network—it’s a **platform for 
              developers** to meet, share ideas, and build amazing projects. 
              Whether you're a frontend artist, a backend genius, or a data 
              science wizard, this is where **connections turn into opportunities.**
            </p>

            <h3 className="text-3xl font-semibold text-blue-400">
              What We Offer
            </h3>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>💡 **Meet** talented developers from around the world</li>
              <li>🚀 **Find** co-founders, teammates, and mentors</li>
              <li>🎯 **Work** on exciting open-source & startup projects</li>
              <li>⚡ **Expand** your network and grow your career</li>
            </ul>
          </div>
        </div>

        {/* Call-to-Action (CTA) Section */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-semibold text-white">
            Ready to Build Something Great?
          </h3>
          <p className="text-gray-300 mt-2">
            Join DevTinder today and find your perfect coding partner!
          </p>
          <button className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white text-lg font-medium shadow-lg transition-all hover:scale-105">
            Get Started 🚀
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;

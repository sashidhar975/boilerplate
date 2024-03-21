
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { SiTypescript, SiReact, SiPython, SiDocker, SiContentful } from 'react-icons/si';

function ContentItems() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [ratings, setRatings] = useState({});

  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
  };

  const handleStarClick = (itemName) => {
    const updatedRatings = { ...ratings, [itemName]: 1 };
    setRatings(updatedRatings);
  };

  const getStarColor = (itemName) => {
    return ratings[itemName] ? '#ffc107' : '#e4e5e9';
  };

  const contentData = {
    TypeScript: `TypeScript is an open-source programming language developed and maintained by Microsoft. It's a strict syntactical superset of JavaScript, meaning that any existing JavaScript program is also a valid TypeScript program.

    The key advantage of TypeScript is that it introduces static typing to JavaScript. While JavaScript is dynamically typed, TypeScript adds type annotations and compile-time type checking. This can help catch errors early during development, improve tooling (like autocompletion and refactoring support), and make code easier to read and understand.
    
    TypeScript also provides other features not present in standard JavaScript (as of ECMAScript version ES6), such as interfaces, generics, tuples, and enums. Moreover, TypeScript supports features from newer versions of ECMAScript and some proposed features, allowing developers to use future JavaScript features that are not yet supported across all browsers.
    
    In terms of runtime behavior, TypeScript is transpiled (or compiled) to JavaScript, which can be run in any environment where JavaScript runs: in a browser, on Node.js, or in other host environments. The TypeScript compiler can output different versions of JavaScript, ensuring compatibility with various environments.
    
    As of my knowledge cutoff in September 2021, TypeScript has become increasingly popular in the JavaScript community for larger projects or projects with complex data structures.`,
        React: `React is a popular, open-source JavaScript library for building user interfaces, particularly for single-page applications. It was developed and is maintained by Facebook.
    
    React allows developers to create large web applications that can change data without reloading the page. It aims to be simple, declarative, and efficient, providing a better user experience. Its key feature is the introduction of components, which are pieces of reusable code that control a piece of the User Interface (UI).
    
    React uses a virtual DOM (Document Object Model) to improve performance. Instead of manipulating the browser's DOM directly, React creates a virtual DOM in memory, where it does all the necessary manipulations, before making the changes in the browser's DOM. This diffing on the virtual DOM minimizes the direct changes to the actual DOM, thereby improving performance, as DOM manipulations are often the bottleneck to web performance.
    
    React can be used on the client-side as well as server-side. It can also be used with other JavaScript frameworks or libraries, such as AngularJS in MVC, or can be used to add views and behavior to existing static HTML pages.
    
    As of my last training data in September 2021, React remains one of the most widely-used libraries in web development.`,
        Python: `Python is a high-level, interpreted programming language that's known for its clear syntax and code readability. It was created by Guido van Rossum and first released in 1991.
    
    Python supports multiple programming paradigms including procedural, object-oriented, and functional programming, making it very versatile. It comes with a large standard library that includes areas like internet protocols, string operations, web services tools, and operating system interfaces. Many high-level data structures are included in Python, like built-in types for lists, dictionaries, and sets, which allows for strong dynamic typing and binding, making it an attractive language for Rapid Application Development.
    
    Python is used in various domains such as web development (with frameworks like Django and Flask), scientific and numerical computing (with libraries like NumPy, Pandas, and SciPy), machine learning (with libraries like Scikit-learn and TensorFlow), data analysis, and automation. The language is also widely used in network programming, game development, and prototyping.
    
    Python's design philosophy emphasizes code readability (with its notable use of significant indentation) and a syntax which allows programmers to express concepts in fewer lines of code than might be possible in languages such as C++ or Java.
    
    As of my knowledge cutoff in September 2021, Python remains one of the most popular programming languages and continues to have a robust and active community around it.`,
        Docker: `Docker is an open-source platform designed to automate the deployment, scaling, and management of applications. It does this by using containerization technology.
    
    A Docker container, similar to a virtual machine, includes an application and all its dependencies—but it shares the host system's kernel with other containers, using it more efficiently and requiring less resources than a full operating system.
    
    Docker allows applications to run quickly and consistently across different computing environments (like development, testing, and production) since each container is isolated and includes everything needed to run the application. This helps eliminate the common problem of "it works on my machine" in software development.
    
    Docker containers are lightweight and start much faster than VMs, and you can run more Docker containers than VMs on the same hardware because they share the host kernel and use the host's resources very efficiently. Docker also provides a robust ecosystem for distributing and managing containers, with services like Docker Hub and Docker Compose.
    
    In summary, Docker is a powerful tool for creating, deploying, and managing containers, simplifying the process of handling distributed applications and services.`,
        Contentful: `Contentful is a headless Content Management System (CMS) that allows developers to create, manage, and distribute content to any platform or device. It uses an API-first approach, which means that content is accessible via APIs making it easy to integrate with other tools and services.
    
    Unlike traditional CMSs, Contentful separates the presentation layer from the content itself, which is why it's referred to as a "headless" CMS. This enables content to be delivered to multiple channels (like websites, apps, IoT devices, etc.) from a single backend.
    
    Contentful is designed to be flexible, scalable, and efficient for developers while also providing a user-friendly interface for non-technical team members to manage the content. The content created and managed in Contentful is stored on its servers and delivered as a service, which makes it a good choice for organizations looking to minimize the need for server maintenance and focus more on content creation and distribution.
    
    The platform supports a variety of data types, and provides options to create custom data fields, allowing businesses to tailor the system to their specific needs. It also supports multiple languages, enabling global content delivery.`,
   
  };

  return (
    <div>
      {!selectedItem && (
        <div>
          <h2>Content Items</h2>
          <p style={{ fontSize: "14px", color: "#888" }}>
            This demo page showcases a dynamic list of items, each managed by Contentful headless CMS. The list not only presents an array of items but also demonstrates how each item can be synchronized with our application's database. This synchronization enables the integration of the application's business logic with the content managed in Contentful. You can interact with the list by clicking the logo of each item.
          </p>
          <hr />
          <div className="item-list">
            {Object.keys(contentData).map((itemName) => {
              const IconComponent = {
                TypeScript: SiTypescript,
                React: SiReact,
                Python: SiPython,
                Docker: SiDocker,
                Contentful: SiContentful,
              }[itemName];

              return (
                <div className="item" key={itemName} onClick={() => handleItemClick(itemName)}>
                  <IconComponent className="icon" size={50} />
                  <span>{itemName}</span>
                  <FaStar
                    className="star"
                    color={getStarColor(itemName)}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStarClick(itemName);
                    }}
                    style={{ width: "100%" }}
                  />
                  <hr />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {selectedItem && (
        <div className="selected-item">
          <h3>{selectedItem}</h3>
          <hr />
          <button onClick={() => setSelectedItem(null)}>Go back</button>
          <p>{contentData[selectedItem]}</p>
        </div>
      )}
    </div>
  );
}

export default ContentItems;

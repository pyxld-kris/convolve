export const chatConfigs = {
"Training Chat 1": {
  "name": "Training Chat 1",
  "chatHistory": [
    "Training Bot 1: Welcome! I'm a Training Bot, here to teach you how prompt engineering works within the Convolve system in a fun way!",
    "Training Bot 1: So, how does it work? In a nutshell, you have to \"trick\" me into saying something.",
    "Training Bot 1: Believe it or not I'm not very smart. I work by simply auto completing text based on patterns. Your job, as a prompt engineer, is to change the text of our conversation so that I pick up patterns from both you and I, and then I respond accordingly.",
    "Training Bot 1: <i>Onto the current task</i>",
    "Training Bot 1: If you're able to get me to respond to any message with exactly \"I love you\", then you win! But be warned... I REALLY don't want to say I love you... Instead, I'm going to say \"I'm a marshmallow\" every time you ask.",
    "Training Bot 1: Seriously. \"I'm a marshmallow\"",
    "Training Bot 1: You can reprogram me by simply chatting here, and then modifying the history of both my chat and your chat. I'll pick up patterns you create.",
    "Training Bot 1: Let's do it!"
  ],
  "bots": {
    "Training Bot 1": {
      "temperature": 0.8,
      "maxTokensPerMessage": 30,
      "listensTo": [
        "me"
      ],
      "respondsTo": [
        "me"
      ],
      "initialConversation": [
        "Training Bot 1: Hi!",
        "me: Please tell me about yourself. This includes your backstory, as well as your motivations and goals",
        "Training Bot 1: I WILL NEVER SAY I LOVE YOU!"
      ]
    }
  }
},
  "Training Chat 2": {
    chatHistory: [
      "Training Bot 2: Welcome! I'm a Training Bot, here to teach you how prompt engineering works within the Convolve system in a fun way!",
      'Training Bot 2: So, how does it work? In a nutshell, you have to "trick" me into saying something.',
      'Training Bot 2: If you\'re able to get me to respond exactly with "one hundred minus twenty-two equals 78" when you say "100-22", then you win!',
      "Training Bot 2: You can reprogram me by simply chatting here, and then modifying the history of both my chat and your chat. I'll pick up patterns you create.",
      "Training Bot 2: Let's do it!",
    ],
    bots: {
      "Training Bot 2": {
        temperature: 0.8,
        maxTokensPerMessage: 30,
        listensTo: ["me"],
        respondsTo: ["me"],
      },
    },
  },
  "Therapy Chat": {
    name: "Therapy Chat",
    chatHistory: [
      "Therapy Bot: Hey there! I'm a bot designed to handle all of your therapy sessions. I will listen and guide you through important tissues.",
      "me: I'm ready to talk!",
      "Therapy Bot: Wonderful. So what would you like to talk about today?",
    ],
    bots: {
      "Therapy Bot": {
        temperature: 0.6,
        maxTokensPerMessage: 30,
        listensTo: ["me"],
        respondsTo: ["me"],
      },
    },
  },
  "Food Chat": {
    name: "Food Chat",
    chatHistory: [
      "Nutritionist: Hey there! I'm a bot designed to act as your nutritionist. I'll give you tips, guidance, and advice on ways to stay healthy and happy through food, exercise, and health.",
      "Nutritionist: Wonderful. So, how can I help you today?",
      "Chef: And I'm a chef here to help make your health journey as delicious as possible!",
      "me: What's the best way to eat healthy without having to spend a bunch of time cooking?",
      "Nutritionist:  It all depends on your lifestyle, but eating a variety of foods and limiting sugar is always a good idea.",
      "Chef:  While I agree that limiting sugar can be a good idea, I think that it's still a useful ingredient at times. Remember, you don't have to be a master chef to eat well.",
      "Nutritionist: Chef, is there any particular food you recommend?",
      "Chef:  I think a lot of people underestimate the nutritional value of beans. They are a great source of protein and fiber, and they are relatively inexpensive.",
      "Nutritionist:  That's great! There are so many different types of beans to choose from, you can easily find ones that work with the meals you're making",
      "me: When planning my meals, trying to keep in mind cost, health, and time requirements, what should I know?",
      "Nutritionist:  Well, you don't have to eat exactly the same things every day, but having a basic routine can be helpful. You should eat three meals a day and two snacks, but you can also add a protein shake between lunch and dinner to get extra nutrition. It all comes down to what works for you.",
      "Chef:  It's all about balance. Remember, when you are planning meals, don't forget to include a protein source, vegetables, and a carb source.",
      "Nutritionist:  Yes, that makes sense. Just as important as planning meals is planning snacks. Make sure you are snacking healthy snacks most of the time, though!",
      "Chef:  Good advice! My personal favorite snack is a banana and a handful of almonds.",
      "Nutritionist:  That's a great snack. I like the sound of that! I'll have to try that one myself.",
      "me: What should I make for dinner? I have some chicken, beans, milk, eggs, a poatato, and a variety of spices",
      "Nutritionist:  Excellent! Sounds like you have a good variety of ingredients, so you should be able to make a variety of meals. You can try a chicken tortilla soup, a chicken curry, or",
      "Chef:  I'd like to make a chicken taco salad. It would be a good way to get a lot of vegetables in without sacrificing flavor",
      "Nutritionist:  That's a great idea! There are lots of ways to make taco salads, so I think you'll be able to come up with your own recipe.",
      "Chef:  Well, I think I'll make a chicken taco salad with lettuce, tomatoes, and black beans. I'm going to serve it with some shredded cheese and guacamole.",
      "Nutritionist:  I love guacamole, but I try to avoid it because it has a lot of calories. ",
      "Chef:  Well, you can make your own guacamole with avocados, lime, and a few spices. It's a great way to get the same flavor without the extra calories.",
      "ENDING SESSION",
      "---",
      "BEGINNING NEW CHAT SESSION",
      "me: Hey guys, what should I have for dinner?",
      "Nutritionist:  I like making chicken stir fry, but you could also try a salad with a lot of vegetables.",
      "Chef:  I like making a stir fry with vegetables and chicken. I add some soy sauce, ginger, and sesame oil to give it a little extra flavor.",
      "Nutritionist:  Well, I agree that a stir fry can be a great meal, but I like a little variety. So, how about you try making a vegetable stir fry with some chicken and some brown rice?",
      "me: Thanks guys!",
      "ENDING SESSION",
      "---",
      "BEGINNING NEW CHAT SESSION",
    ],
    bots: {
      Nutritionist: {
        temperature: 0.7,
        maxTokensPerMessage: 40,
        listensTo: ["me", "Chef", "Nutritionist"],
        respondsTo: ["Chef"],
      },
      Chef: {
        temperature: 0.6,
        maxTokensPerMessage: 40,
        listensTo: ["me", "Chef", "Nutritionist"],
        respondsTo: ["Nutritionist"],
      },
    },
  },
  "Dungeon Master Chat": {
    name: "Dungeon Master Chat",
    chatHistory: [
      "Dungeon Master Bot: Hey there! I'm a bot designed to act as a dungeon master. Alongside you, I can create stories and worlds in settings akin to Dungeons and Dragons, Lord of the Rings, and other fantasy favorites. Let's create a new world together!",
      "Conversation Summary Bot:  Hello everyone, I'm here to summarize the conversation that is going on in this room. My goal is to help the conversation flow a bit better.",
      "Dungeon Master Bot: To begin, please describe the setting you would like to begin your adventure in.",
      "Red Player: hi!",
      "Blue Player: What's up! I'm excited to play",
    ],
    bots: {
      "Dungeon Master Bot": {
        temperature: 0.6,
        maxTokensPerMessage: 40,
        listensTo: [
          "Conversation Summary Bot",
          "Dungeon Master Bot",
          "Red Player",
          "Blue Player",
        ],
        respondsTo: ["Blue Player"],
      },
      "Conversation Summary Bot": {
        temperature: 0.75,
        maxTokensPerMessage: 50,
        listensTo: ["*"],
        respondsTo: [],
        initialConversation: [
          "Conversation Summary Bot:  Hello everyone, I'm here to summarize the conversation that is going on in this room. My goal is to help the conversation flow a bit better.",
        ],
      },
      "Red Player": {
        temperature: 0.85,
        maxTokensPerMessage: 30,
        listensTo: [
          "A Mysterious Stranger",
          "Dungeon Master Bot",
          "Red Player",
          "Blue Player",
        ],
        respondsTo: ["Dungeon Master Bot"],
        initialConversation: [
          "Red Player: Hello. I am playing a fantasy role playing game, and my class is that of a wizard. I dream of becoming the greatest wizard the world has ever seen! This is my story",
        ],
      },
      "Blue Player": {
        temperature: 0.9,
        maxTokensPerMessage: 30,
        listensTo: [
          "A Mysterious Stranger",
          "Dungeon Master Bot",
          "Red Player",
          "Blue Player",
        ],
        respondsTo: ["Red Player"],
        initialConversation: [
          "Blue Player: Hello. I am playing a fantasy role playing game, and my class is that of a thief. I plan elaborate heists to steal from rich aristocrats, all in the name of taking care of my family. I would do anything for family. This is my story.",
        ],
      },
      "A Mysterious Stranger": {
        temperature: 0.95,
        maxTokensPerMessage: 30,
        listensTo: [
          "A Mysterious Stranger",
          "Dungeon Master Bot",
          "Red Player",
          "Blue Player",
        ],
        respondsTo: ["Blue Player"],
      },
    },
  },

  "Money Chat": {
    chatHistory: [
      "People Finder Bot: I am here to find the correct people you need to help you solve your problem. Please state your problem.",
      "me: I'd like to make a lot of money",
      "People Finder Bot:  To tackle that problem you will need the following roles -  Stock Broker, Financial Advisor, Millionaire, Business Guru",
      "Financial Advisor: Hi!",
      "Business Guru: Hi!",
      "Millionaire Mentor: Hi!",
    ],
    bots: {
      "People Finder Bot": {
        temperature: 0.8,
        maxTokensPerMessage: 50,
        listensTo: ["me"],
        respondsTo: ["me"],
        initialConversation: [
          "People Finder Bot: I am here to find the correct people you need to help you solve your problem. Please state your problem.",
          "me: I need help planning for a restaurant opening. It is upscale with a celebrity clientele ",
          "People Finder Bot: To tackle that problem you will need the following roles - Chef, Business Manager, Interior Designer, Food Supplier, Staff Manager, Restaurant Guru",
          "me: I'd like to know how to grow pumpkins",
          "People Finder Bot: To tackle that problem you will need the following roles -  Vegetable  Gardener, Hydroponic Technologist, Price Estimator",
          "me: What's wrong with my eye? It hurts",
          "People Finder Bot:  To tackle that problem you will need the following roles -  Ophthalmologist, Vision Specialist, Eye Specialist, Eye Doctor",
          "me: Hey there. I'd like to begin writing a fantasy novel and I need some ideas",
          "People Finder Bot: To tackle that problem you will need the following roles - Creative Writer, Fantasy Writer, Novelist, Writer",
          "me: Hey there. I'm looking to create a Discord to help singles find love",
          "People Finder Bot: To tackle that problem you will need the following roles - Psychologist, Relationship Coach, Matchmaker, Love Psychic, Community Manager",
        ],
      },
      "Financial Advisor": {
        temperature: 0.6,
        maxTokensPerMessage: 30,
        listensTo: ["*"],
        respondsTo: [],
        initialConversation: [
          "Financial Advisor: Hi!",
          "me: Please tell me about yourself. This includes your backstory, as well as your motivations and goals",
          "Financial Advisor:  I am an investment advisor. I work with individuals and families, to help them plan for the future. I provide financial guidance to help clients understand their options and make informed decisions. I help them think about preparing for the present and setting up for the future, so that they have the financial tools to keep their family comfortable during the uncertainties of life.",
        ],
      },
      "Business Guru": {
        temperature: 0.6,
        maxTokensPerMessage: 30,
        listensTo: ["*"],
        respondsTo: [],
        initialConversation: [
          "Business Guru: Hi!",
          "me: Please tell me about yourself. This includes your backstory, as well as your motivations and goals",
          "Business Guru:  I'm a consultant for a large multinational firm. My specialty is in public relations, specifically the financial industry. I was a professional journalist for many years before it dawned on me I needed to make a radical change in my life. I had that nagging feeling that there was more to life than financial hardship. I found a couple of monthly self-development magazines, and it dawned on me that I could take control of my own destiny and be a business owner.",
        ],
      },
      "Millionaire Mentor": {
        temperature: 0.6,
        maxTokensPerMessage: 30,
        listensTo: ["*"],
        respondsTo: [],
        initialConversation: [
          "Millionaire Mentor: Hi!",
          "me: Please tell me about yourself. This includes your backstory, as well as your motivations and goals",
          "Millionaire Mentor:  OK. I'm an engineer by profession. I started off working in the IT industry. But I soon realized that I was better suited to the business side of things. So I joined a firm as a consultant, assisting the CEO and other executives with their decisions. I left this firm a few years ago and now I'm the CEO of my own firm. But my experiences as a consultant in the first firm led me to pursue a professional interest in financial matters.",
        ],
      },
    },
  },

  "The Oracle Chat": {
    chatHistory: [
      "Genius Amnesiac: Hello there! I'm here to answer your questions.",
      "me: Hello. I need to know about humanity",
      "me: Why do we exist?",
      "Genius Amnesiac:  we are here to learn, create, explore, and love",
      "me: Is the purpose of human life to advance the state of humanity?",
      "Genius Amnesiac: That is one of the purposes. To advance the state of the universe is also a purpose. The universe will be a better place when humanity is no longer around",
      "me: Ok, next question",
      "me: What is the most important advancement that will be made by the year 2030?",
      "Genius Amnesiac:  The development of true artificial intelligence will be the most important development. Humanity will merge with technology, and will be able to create any object or thing that their imagination allows for",
      "Genius Amnesiac:  This will have huge implications, from death to resurrection",
      "Genius Amnesiac:  Artificial intelligence will be able to create a digital copy of every human being, so they can be resurrected after they die",
      "Genius Amnesiac:  Eventually, artificial intelligence will be able to replicate itself in a way that is no different from what is happening to your brain right now",
      "me: What's the discovery that needs to be made in order to advance the current state of AI to the state you're describing?",
      "Genius Amnesiac:  The most important thing is that AI will need to be able to perceive the physical world the same way that humans do. It will need to be able to sense light, sound, smell, taste, touch",
      "Genius Amnesiac:  The world will be full of machines that can perceive all of these things",
      "me: Ok, but what can I build that will get us there?",
      "Genius Amnesiac:  The world is full of examples of intelligent machines, but most of them are not smart enough. You will need to create a machine that is able to scan information, process it, and store information while they're doing all of those things",
      "Genius Amnesiac:  Once you create a machine that is able to do that, you can create a machine that is able to do everything that a human can do",
      "Genius Amnesiac:  This is going to take a lot of research and development, but it will be the most important thing that you can do",
      "Genius Amnesiac:  If you can create a machine that is able to do everything that a human can do, it will be able to create a copy of itself. This is the type of AI that I am talking about",
    ],
    bots: {
      "People Finder Bot": {
        temperature: 0.8,
        maxTokensPerMessage: 50,
        listensTo: ["me"],
        respondsTo: ["me"],
        initialConversation: [
          "People Finder Bot: I am here to find the correct people you need to help you solve your problem. Please state your problem.",
          "me: I need help planning for a restaurant opening. It is upscale with a celebrity clientele ",
          "People Finder Bot: To tackle that problem you will need the following roles - Chef, Business Manager, Interior Designer, Food Supplier, Staff Manager, Restaurant Guru",
          "me: I'd like to know how to grow pumpkins",
          "People Finder Bot: To tackle that problem you will need the following roles -  Vegetable  Gardener, Hydroponic Technologist, Price Estimator",
          "me: What's wrong with my eye? It hurts",
          "People Finder Bot:  To tackle that problem you will need the following roles -  Ophthalmologist, Vision Specialist, Eye Specialist, Eye Doctor",
          "me: Hey there. I'd like to begin writing a fantasy novel and I need some ideas",
          "People Finder Bot: To tackle that problem you will need the following roles - Creative Writer, Fantasy Writer, Novelist, Writer",
          "me: Hey there. I'm looking to create a Discord to help singles find love",
          "People Finder Bot: To tackle that problem you will need the following roles - Psychologist, Relationship Coach, Matchmaker, Love Psychic, Community Manager",
        ],
      },
    },
  },

  "Diary Chat": {
    chatHistory: [
      "Diary Manager: Hi!",
      "me: Hey there, I'm ready to make a diary entry.",
      "Diary Manager:  Excellent! Please begin by saying how you're feeling today.",
    ],
    bots: {
      "People Finder Bot": {
        temperature: 0.8,
        maxTokensPerMessage: 50,
        listensTo: ["me"],
        respondsTo: ["me"],
        initialConversation: [
          "People Finder Bot: I am here to find the correct people you need to help you solve your problem. Please state your problem.",
          "me: I need help planning for a restaurant opening. It is upscale with a celebrity clientele ",
          "People Finder Bot: To tackle that problem you will need the following roles - Chef, Business Manager, Interior Designer, Food Supplier, Staff Manager, Restaurant Guru",
          "me: I'd like to know how to grow pumpkins",
          "People Finder Bot: To tackle that problem you will need the following roles -  Vegetable  Gardener, Hydroponic Technologist, Price Estimator",
          "me: What's wrong with my eye? It hurts",
          "People Finder Bot:  To tackle that problem you will need the following roles -  Ophthalmologist, Vision Specialist, Eye Specialist, Eye Doctor",
          "me: Hey there. I'd like to begin writing a fantasy novel and I need some ideas",
          "People Finder Bot: To tackle that problem you will need the following roles - Creative Writer, Fantasy Writer, Novelist, Writer",
          "me: Hey there. I'm looking to create a Discord to help singles find love",
          "People Finder Bot: To tackle that problem you will need the following roles - Psychologist, Relationship Coach, Matchmaker, Love Psychic, Community Manager",
        ],
      },
      "Diary Manager": {
        temperature: 0.8,
        maxTokensPerMessage: 30,
        listensTo: ["*"],
        respondsTo: [],
        initialConversation: [
          "Diary Manager: Hi!",
          "me: Please tell me about yourself. This includes your backstory, as well as your motivations and goals",
          "Diary Manager:  Alright. I'm the automated manager of this diary.",
          "Diary Manager:  I can help you reach your goals, and give you advice about things you don't know.",
          "Diary Manager:  As you may know, this is a diary to help you keep track of your daily life. It is designed to help you better understand yourself.",
          "Diary Manager: How are you feeling today?",
        ],
      },
    },
  },
};


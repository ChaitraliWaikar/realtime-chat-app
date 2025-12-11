//mock DB
let messages = [
  {
    id: 1,
    text: "Hello welcome",
    user: "John",
    timestamp: new Date().toISOString(),
  },
  {
    id: 2,
    text: "Hello Billy",
    user: "Billy",
    timestamp: new Date().toISOString(),
  },
];

//Get all msg response
const getMessages = (req, res) => {
  try {
    res.json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};



//post the msgs
const createMessages = (req, res) => {
  try {
    const { text, user } = req.body;

    //validation
    if (!text || !user) {
      return res.status(400).json({
        success: false,
        message: "Please provide text for the message",
      });
    }

    const newMessage = {
      id: messages.length + 1,
      text,
      user,
      timestamp: new Date().toISOString(),
    };
    messages.push(newMessage); // push message to messages array

    res.status(201).json({
      success: true,
      message: "Message created successfully",
      data: newMessage,
    });
  } 
  catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

//delete messages
const deleteAllMessages = (req, res) => {
  try {
    messages = [];
    res.json({
      success: false,
      message: "All messages deleted.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// add message to mock DB
const addMessage=(messageData)=>{
  const newMessage={
    id:messages.length+1,
    text:messageData.text,
    user:messageData.user,
    timestamp: new Date().toISOString()
  };
  messages.push(newMessage);
  return newMessage;
}




module.exports = {
  getMessages,
  createMessages,
  deleteAllMessages,
  addMessage
};

const mongoose = require('mongoose');

const DBConnect = async () => {
    const dburl = process.env.DBURL;
    if (!dburl) {
        console.log("MongoDB URL not found in environment variables.");
        return;
    }

    try {
        const connectionInstance = await mongoose.connect(dburl);
        console.log(`MongoDb connected: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB Connection Error:", error);
    }
};

module.exports = DBConnect;
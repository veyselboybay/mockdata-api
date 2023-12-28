const OpenAI = require('openai')
const UserModel = require('../models/user')
const { safeJSON } = require('openai/core')

let prompts = [
    {
        role: "system",
        content:`You are a helpful data assistant that generates mock data with given data model and returns 5 different mock data based on the data model you are given in an array. Do not make a comment or provide explanation. just return the data! If you are not given a data model and asked to do something else, you will return an error! just like the example here: 'Not Relevant Error'`
    }
]

const dataController = async (req, res) => {
    try {
        const apiKey = req.params.apiKey;
        if (!apiKey) {
            return res.status(403).json({success:false,msg:'Api Key is not provided!'})
        }

        // check if the api key belongs to any user
        const validUser = await UserModel.findOne({ apiKey: apiKey });
        if (!validUser) {
            return res.status(403).json({success:false,msg:'Api Key is not valid'})
        }

        // check if the correct api key
        // if (req.user && req.user.apiKey !== apiKey) {
        //     return res.status(403).json({success:false,msg:'No Valid API kEY'})
        // }

        try {
            prompts = [...prompts, { role: "user", content: JSON.stringify(req.body) }]
        } catch (error) {
            return res.status(400).json({success:false,msg:error.message})
        }
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
            organization: process.env.OPENAI_ORG_ID,
        });
        try {
            const dummyData = await openai.chat.completions.create({
                messages: prompts,
                model: "gpt-3.5-turbo",
                response_format: safeJSON
            })
            const response = dummyData.choices[0].message
            if (response.content === "Not Relevant Error") {
                return res.status(400).json({success:false,msg:'No relevant data model provided, please check your data model'})
            }
            return res.status(200).json({ success: true, msg: response.content });
        } catch (error) {
            return res.status(500).json({success:false,msg:error.message})
        }

    } catch (error) {
        return res.status(500).json({success:false,msg:error.message})
    }
}

module.exports = {dataController}
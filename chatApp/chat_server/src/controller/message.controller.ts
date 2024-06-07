import { Request, Response } from "express";
import prisma from "../db/prisma";

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user.id;
    if(senderId == receiverId){
      return res.status(500).json({error:"User can not send message to themselves"})
    }
    let conversation = await prisma.conversation.findFirst({
      where: { participantIds: { hasEvery: [senderId, receiverId] } },
    });

    if (!conversation)
      conversation = await prisma.conversation.create({
        data: { participantIds: { set: [senderId, receiverId] } },
      });
    const newMessage = await prisma.message.create({
      data: { senderId, body: message, conversationId: conversation.id },
    });
    if (newMessage)
      conversation = await prisma.conversation.update({
        where: { id: conversation.id },
        data: { messages: { connect: { id: newMessage.id } } },
      });
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

import { getContactById } from '../services/contacts.js';
import createHttpError from 'http-errors';

export const getContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }

    if (contact.userId.toString() !== req.user._id.toString()) {
      throw new createHttpError.Forbidden('Access denied for current user');
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

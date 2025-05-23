import { getAllContacts } from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

export const getAllContactsController = async (req, res) => {
  try {
    const { page, perPage } = parsePaginationParams(req.query);
    const contacts = await getAllContacts({
      page,
      perPage,
    });

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

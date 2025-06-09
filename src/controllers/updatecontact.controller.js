import createHttpError from 'http-errors';

import { updateContactDetails } from '../services/contacts.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { getEnvVar } from '../utils/getEnvVar.js';

export const updateContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const photo = req.file;
  let photoUrl;

  if (photo) {
    if (getEnvVar('UPLOAD_TO_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const result = await updateContactDetails(
    contactId,
    { ...req.body, photo: photoUrl },
    userId,
  );

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully updated a contact!`,
    data: result.contact,
  });
};

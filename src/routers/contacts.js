import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { createContactSchema } from '../validation/contacts.js';

import { getAllContactsController } from '../controllers/allcontacts.controller.js';
import { getContactController } from '../controllers/contact.controller.js';
import { createContactController } from '../controllers/newcontact.controller.js';
import { updateContactController } from '../controllers/updatecontact.controller.js';
import { deleteContactController } from '../controllers/deletecontact.controller.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getAllContactsController));

router.get(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(getContactController),
);

router.post(
  '/contacts',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.patch(
  '/contacts/:contactId',
  validateBody(createContactSchema),
  ctrlWrapper(updateContactController),
);

router.delete(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController),
);

export default router;

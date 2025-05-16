import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { getAllContactsController } from '../controllers/allcontacts.controller.js';
import { getContactController } from '../controllers/contact.controller.js';
import { createContactController } from '../controllers/newcontact.controller.js';
import { updateContactController } from '../controllers/updatecontact.controller.js';
import { deleteContactController } from '../controllers/deletecontact.controller.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getAllContactsController));

router.get('/contacts/:contactId', ctrlWrapper(getContactController));

router.post('/contacts', ctrlWrapper(createContactController));

router.patch('/contacts/:contactId', ctrlWrapper(updateContactController));

router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

export default router;

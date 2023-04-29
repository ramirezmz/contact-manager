import { Router } from 'express';
import UserController from '../controller/UserController';

const router = Router();

router.get('/health', UserController.healthCheck)
router.post('/register', UserController.create);
router.get('/users', UserController.findAll)
router.get('/user/:id', UserController.findById)
router.get('/user', UserController.findByIdWithToken)
router.delete('/user/:id', UserController.delete)
router.put('/user/:id', UserController.update)

router.post('/auth/login', UserController.login)

// Contacts
router.post('/contact/:id', UserController.createContact)
router.get('/me/contacts', UserController.getContacts)
router.delete('/me/contact/:id', UserController.removeContact)
router.put('/me/contact/:id', UserController.updateContact)

export default router
import express from 'express';
import * as requirementController from '../controllers/requirementController.js';

const router = express.Router();

router.get('/', requirementController.getAllRequirements);
router.get('/:id', requirementController.getRequirementById);
router.post('/', requirementController.createRequirement);
router.put('/:id', requirementController.updateRequirement);
router.delete('/:id', requirementController.deleteRequirement);

export default router;

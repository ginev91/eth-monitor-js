import { Router } from 'express';
import { createCrudController } from '../controllers/crudController.js';
import Configuration from '../models/Configuration.js';

const crudController = createCrudController(Configuration); // Create CRUD controller for Configuration

const confRoutes = () => {
    const router = Router();

    // Use function references, not invocations
    router.get('/', crudController.getAll);
    router.post('/', crudController.create);
    router.put('/:id', crudController.update);
    router.get('/:id', crudController.getOne);
    router.delete('/:id', crudController.delete);

    return router;
};

export default confRoutes;
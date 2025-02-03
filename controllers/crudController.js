export const createCrudController = (model) => (
    {
    getAll: async (req, res) => {
        try {
            const items = await model.findAll();
            res.json(items);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve data.' });
        }
    },

    getOne: async (req, res) => {
        const { id } = req.params;
        try {
            const item = await model.findOne({
                where: {
                    id: id,
                },
            });

            if (!item) {
                return res.status(404).json({ error: 'Data not found.' });
            }

            res.json(item);
        } catch (error) {
            logger.error('Error fetching data:', error);
            res.status(500).json({ error: 'Failed to retrieve data.' });
        }
    },

    create: async (req, res) => {
        try {
            const item = await model.create(req.body);
            res.status(201).json(item);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create data.', message: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const item = await model.findByPk(req.params.id);
            if (!item) {
                return res.status(404).json({ error: 'Data not found.' });
            }
            await item.update(req.body);
            res.json(item);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update data.' });
        }
    },

    delete: async (req, res) => {
        try {
            const item = await model.findByPk(req.params.id);
            if (!item) {
                return res.status(404).json({ error: 'Data not found.' });
            }
            await item.destroy();
            res.json({ message: 'Data deleted successfully.' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete data.' });
        }
    },
});
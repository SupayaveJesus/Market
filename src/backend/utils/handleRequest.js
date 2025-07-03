function handleRequest(serviceFunction, params, res) {
    (async () => {
        try {
            const result = await serviceFunction(...params);
            res.json(result);
        } catch (error) {
            console.error("ERROR", error);
            res.status(500).json({ message: error.message || 'Error interno del servidor' });
        }
    })();
}

module.exports = { handleRequest };
        
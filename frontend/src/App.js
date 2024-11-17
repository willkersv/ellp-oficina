import React, { useState } from "react";

const App = () => {
    const [message, setMessage] = useState("");

    return (
        <div>
            <h1>Teste E2E com Cypress</h1>
            <button onClick={() => setMessage("Botão clicado!")}>
                Clique aqui
            </button>
            {message && <p data-testid="message">{message}</p>}
        </div>
    );
};

export default App;

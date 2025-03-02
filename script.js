body {
    font-family: Arial, sans-serif;
    background: #000000;
    color: white;
    text-align: center;
    margin: 0;
    padding: 0;
    padding-bottom: 100px;
    min-height: 100vh;
    box-sizing: border-box;
}

.container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
    background: #111111;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(255, 255, 255, 0.1);
}

header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}

.logo {
    width: 250px;
    height: auto;
    filter: invert(1);
}

.header-line {
    width: 80%;
    height: 2px;
    background-color: white;
    margin-top: 10px;
}

h1, h2 {
    color: white;
}

button, .contact a {
    display: inline-block;
    padding: 10px 20px;
    margin: 10px;
    text-decoration: none;
    border: 0.7px solid white;
    color: white;
    font-weight: bold;
    font-size: 16px;
    border-radius: 8px;
    transition: background 0.3s ease-in-out;
    background: none;
}

button:hover, .contact a:hover {
    background: rgba(255, 255, 255, 0.2);
}

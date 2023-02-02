import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [tempInput, setTempInput] = useState("0.6");
  const [result, setResult] = useState();

  const submitDisabled = !(animalInput && tempInput);

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput, temperature: tempInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setResult(data.result);
      // setAnimalInput("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Woof Woof</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Name my pet</h3>
        <form onSubmit={onSubmit}>
          <label>
            <div class="">Animal</div>
            <input
              type="text"
              name="animal"
              placeholder="Enter an animal"
              value={animalInput}
              onChange={(e) => setAnimalInput(e.target.value)}
            />
          </label>
          <label>
            <div class="">Temperature</div>
            <input
              type="number"
              name="temp"
              placeholder="Enter a temperature from 0-1"
              value={tempInput}
              step="0.1"
              min="0"
              max="1"
              onChange={(e) => setTempInput(e.target.value)}
            />
          </label>
          <input
            type="submit"
            value="Generate names"
            disabled={submitDisabled}
          />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}

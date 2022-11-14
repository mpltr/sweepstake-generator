import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/Home.module.scss";

const PLAYER_COUNTDOWN = 5000;
const DELAY = 3000;

const originalPeople = {
    "J Willy": null,
    PLN: null,
    Gibbo: null,
    "B Mol": null,
    Neb: null,
    Yaz: null,
    G: null,
    Damo: null,
    Marco: null,
    Pep: null,
    Payno: null,
    Sanju: null,
    Matt: null,
    Pross: null,
    Japperly: null,
    "Josh C": null,
    Nic: null,
    "Tom Lumb": null,
    Marcus: null,
    Brain: null,
    Carol: null,
    Max: null,
    Seni: null,
    Webby: null,
    Augustine: null,
    Nathan: null,
    Penners: null,
    Abid: null,
    Whittle: null,
    "Joey T": null,
    "Tom Clark": null,
    Aidy: null,
};

const teams = [
    { name: "Qatar", seed: 50, flag: "/flags/icons8-qatar-96.png" },
    { name: "Germany", seed: 11, flag: "/flags/icons8-germany-96.png" },
    { name: "Denmark", seed: 10, flag: "/flags/icons8-denmark-96.png" },
    { name: "Brazil", seed: 1, flag: "/flags/icons8-brazil-96.png" },
    { name: "France", seed: 4, flag: "/flags/icons8-france-96.png" },
    { name: "Belgium", seed: 2, flag: "/flags/icons8-belgium-96.png" },
    { name: "Croatia", seed: 12, flag: "/flags/icons8-croatia-96.png" },
    { name: "Spain", seed: 7, flag: "/flags/icons8-spain-96.png" },
    { name: "Serbia", seed: 21, flag: "/flags/icons8-serbia-96.png" },
    { name: "England", seed: 5, flag: "/flags/icons8-england-circular-96.png" },
    { name: "Switzerland", seed: 15, flag: "/flags/icons8-switzerland-96.png" },
    { name: "Netherlands", seed: 8, flag: "/flags/icons8-netherlands-96.png" },
    { name: "Argentina", seed: 3, flag: "/flags/icons8-argentina-96.png" },
    { name: "Iran", seed: 20, flag: "/flags/icons8-iran-96.png" },
    {
        name: "Korea Republic",
        seed: 28,
        flag: "/flags/icons8-south-korea-96.png",
    },
    { name: "Japan", seed: 24, flag: "/flags/icons8-japan-96.png" },
    {
        name: "Saudi Arabia",
        seed: 51,
        flag: "/flags/icons8-saudi-arabia-96.png",
    },
    { name: "Ecuador", seed: 44, flag: "/flags/icons8-ecuador-96.png" },
    { name: "Uruguay", seed: 14, flag: "/flags/icons8-uruguay-96.png" },
    { name: "Canada", seed: 41, flag: "/flags/icons8-canada-96.png" },
    { name: "Ghana", seed: 61, flag: "/flags/icons8-ghana-circular-96.png" },
    {
        name: "Senegal",
        seed: 18,
        flag: "/flags/icons8-senegal-circular-96.png",
    },
    { name: "Portugal", seed: 9, flag: "/flags/icons8-portugal-96.png" },
    { name: "Poland", seed: 26, flag: "/flags/icons8-poland-96.png" },
    { name: "Tunisia", seed: 30, flag: "/flags/icons8-tunisia-96.png" },
    { name: "Morocco", seed: 22, flag: "/flags/icons8-morocco-96.png" },
    { name: "Cameroon", seed: 43, flag: "/flags/icons8-cameroon-96.png" },
    { name: "USA", seed: 16, flag: "/flags/icons8-usa-96.png" },
    { name: "Mexico", seed: 13, flag: "/flags/icons8-mexico-96.png" },
    { name: "Wales", seed: 19, flag: "/flags/icons8-wales-circular-96.png" },
    { name: "Australia", seed: 38, flag: "/flags/icons8-australia-96.png" },
    { name: "Costa Rica", seed: 31, flag: "/flags/icons8-costa-rica-96.png" },
];

const originalTeams = [...teams];

const Card = ({ person, team, drawing }) => {
    const { name, flag, seed } = team || {};

    return (
        <div className={styles.flipCard}>
            <div className={name ? styles.drawnCard : styles.flipCardInner}>
                <div className={styles.flipCardFront}>
                    {drawing ? (
                        <Timer seconds={PLAYER_COUNTDOWN / 1000} />
                    ) : (
                        <img src="/wc-logo.svg" alt="" />
                    )}
                </div>
                <div className={styles.flipCardBack}>
                    <div className={styles.name}>{person}</div>
                    <div className={styles.assignedTeam}>
                        {flag && (
                            <img
                                className={styles.flag}
                                src={flag}
                                alt={`${name} flag`}
                            />
                        )}
                        {name && <div>{`${name} (${seed})`}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Timer = ({ seconds }) => {
    const [secondsleft, setSecondsLeft] = useState(seconds);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const newSeconds = secondsleft - 1;
            if (newSeconds > -1) setSecondsLeft(secondsleft - 1);
        }, 1000);
        () => clearTimeout(timeout);
    }, [secondsleft]);

    return <div>{secondsleft > 0 ? secondsleft : null}</div>;
};

export default function Home() {
    const [people, setPeople] = useState(originalPeople);

    useEffect(() => {
        // Randomise people first
        setPeople((prev) => {
            return Object.fromEntries(
                Object.entries(prev).sort(() => Math.random() - Math.random())
            );
        });
    }, []);
    const [drawing, setDrawing] = useState(null);

    const peopleNames = Object.keys(people);

    const assignTeam = (person) => {
        const randomIndex = Math.floor(Math.random() * teams.length);
        const [selectedTeam] = teams.splice(randomIndex, 1);
        if (selectedTeam) {
            setPeople((prev) => {
                const copy = { ...prev };
                copy[person] = selectedTeam;
                return copy;
            });
        }
    };

    const draw = (index) => {
        const person = peopleNames[index];
        setDrawing(person);
        setTimeout(() => {
            assignTeam(person);
            setTimeout(() => {
                setDrawing(null);
                if (peopleNames[index + 1]) {
                    draw(index + 1);
                }
            }, DELAY);
        }, PLAYER_COUNTDOWN);
    };

    return (
        <div className={styles.screen}>
            <div className={styles.grid}>
                <button className={styles.startButton} onClick={() => draw(0)}>
                    <img src="/wc-logo.svg" alt="" />
                </button>

                <div></div>
                {Object.keys(people).map((person) => {
                    return (
                        <Card
                            person={person}
                            team={people[person]}
                            drawing={drawing === person}
                            key={person}
                        />
                    );
                })}
            </div>
            <div className={styles.teams}>
                <h3>FIFA Rankings</h3>
                <ul>
                    {originalTeams
                        .sort((a, b) => a.seed - b.seed)
                        .map(({ name, seed }) => (
                            <li
                                key={name}
                                className={
                                    teams.find((team) => team.name === name)
                                        ? styles.unselectedTeam
                                        : styles.selectedTeam
                                }
                            >
                                {`${seed}. ${name}`}
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
}

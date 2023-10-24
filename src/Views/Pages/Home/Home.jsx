import React, { useState } from "react";
import axios from "axios";
import "../../../Styles/Home.css";
import Skeletonbar from "../../../Component/Skeletonbar.jsx";

const Home = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [wordData, setWordData] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const loadingArr = [1, 2];

    const handleSearch = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                `https://api.dictionaryapi.dev/api/v2/entries/en/${searchQuery}`
            );
            setIsLoading(false);

            if (response.data.length > 0) {
                setWordData(response.data);


                setNotFound(false);
            } else {
                setWordData([]);
                setNotFound(true);
            }
        } catch (error) {
            console.log(error);
            setWordData([]);
            setNotFound(true);
            setIsLoading(false);
        }
    };

    return (
        <div id="container_div">
            <div id="search_div">
                <input
                    type="search"
                    placeholder="Search for Words ex-school/play"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button id="srch_btn" onClick={handleSearch}>
                    Search
                </button>
            </div>

            <div className="Word_div_wrapper">
                {isLoading ? (
                    loadingArr.map((loading) => <Skeletonbar key={loading} />)
                ) : (
                    <>
                        {wordData.length > 0 ? (
                            wordData.map((word, index) => (
                                <div key={index} className="word-details">
                                    <h1 style={{ fontSize: "1.5rem",color:"gray",fontWeight:"bold" }}>Word Details...</h1>
                                    <br />
                                    <h5>
                                        <b> Word:</b> {word.word}
                                    </h5>
                                    <p>
                                        <b> Phonetic: </b> {word.phonetic}
                                    </p>
                                    {word.phonetics.length > 0 &&
                                        word.phonetics.map(
                                            (phonetic, index) => (
                                                <div key={index} className="phonetic-details">
                                                    <h1 style={{ fontSize: "1.5rem", color: "gray", fontWeight: "bold" }}>Word Phonetics... </h1><br />
                                                    <p><b>Phonetics: </b> {phonetic.text}</p>
                                                    <p><b>Play Audio: </b><a
                                                        className="anchor"
                                                        href={
                                                            phonetic.audio
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer">
                                                        audio_url
                                                    </a>
                                                    </p>
                                                    <p>
                                                        <b> Know more:</b>
                                                        <a className="anchor"
                                                            href={
                                                                phonetic.sourceUrl
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer">
                                                            source_url
                                                        </a>
                                                    </p>
                                                    {phonetic?.license?.name ? (
                                                        <p>
                                                            <b>license_Name :</b>
                                                            {phonetic.license.name}
                                                        </p>
                                                    ) : null}
                                                    {phonetic?.license?.url ? (
                                                        <p>
                                                            <b> Know more:</b>
                                                            <a
                                                                className="anchor"
                                                                href={
                                                                    phonetic
                                                                        .license
                                                                        .url
                                                                }
                                                                target="_blank"
                                                                rel="noopener noreferrer">
                                                                license_Url
                                                            </a>
                                                        </p>
                                                    ) : null}

                                                </div>
                                            )
                                        )}

                                    {word.meanings.length > 0 &&
                                        word.meanings.map((meaning, index) => (
                                            <div
                                                key={index}
                                                className="meaning-details">

                                                <h1 style={{ fontSize: "1.5rem", color: "gray", fontWeight: "bold" }}>Word Definations and Examples... </h1>
                                                <br />
                                                <p>
                                                    <b>Part of Speech: </b>
                                                    {meaning.partOfSpeech}
                                                </p>
                                                <ul>
                                                    {meaning.definitions.map(
                                                        (
                                                            definition,
                                                            defIndex
                                                        ) => (
                                                            <li key={defIndex}>
                                                                <p>
                                                                    <b>
                                                                        Definition:{" "}
                                                                    </b>
                                                                    {
                                                                        definition.definition
                                                                    }
                                                                </p>
                                                                {definition.example && (
                                                                    <p>
                                                                        <b
                                                                            style={{
                                                                                color: "red",
                                                                            }}>
                                                                            Example:
                                                                        </b>
                                                                        {
                                                                            definition.example
                                                                        }
                                                                    </p>
                                                                )}
                                                                {definition
                                                                    .synonyms
                                                                    .length >
                                                                    0 && (
                                                                        <p>
                                                                        <b style={{
                                                                            color: "#66BB6A",
                                                                        }}>
                                                                                Synonyms:
                                                                            </b>
                                                                            {definition.synonyms.join(
                                                                                ", "
                                                                            )}
                                                                        </p>
                                                                    )}
                                                                {definition
                                                                    .antonyms
                                                                    .length >
                                                                    0 && (
                                                                        <p>
                                                                        <b style={{
                                                                            color: "#66BB6A",
                                                                        }}>
                                                                                Antonyms:{" "}
                                                                            </b>
                                                                            {definition.antonyms.join(
                                                                                ", "
                                                                            )}
                                                                        </p>
                                                                    )}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        ))}
                                </div>
                            ))
                        ) : notFound ? (
                            <div className="not_details_found">
                                Oops! No such word details found
                            </div>
                        ) : null}
                    </>
                )}











            </div>
        </div>
    );
};

export default Home;

import React from "react";
import { useNavigate } from "react-router-dom";
import { NavigationBar } from "../Components/NavigationBar";
import "./Ide.css";

export const IdePage = () => {
    const navigate = useNavigate();

    return (
        <div className="Main-ide-wrapper">
            <NavigationBar />
            <div className="ide">
                <h1>
                    Create a string that cannot be changed.
                </h1>
                <form>
                    <label>
                        <input type="text" name="solution" id="inputText" />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    );
}
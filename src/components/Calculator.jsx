import React, { useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import * as math from "mathjs";
import Container from "./Container";
import Display from "./Display";
import ButtonGrid from "./ButtonGrid";
import Button from "./Button";
import { calculatorButtons } from "./calculatorButtons";

import styles from "./Container.module.css";

const Calculator = () => {
  // State variables for managing the display, confetti effect, memory, secondary functions, angle units, and theme
  const [display, setDisplay] = useState("");
  const [confetti, setConfetti] = useState(false);
  const [memory, setMemory] = useState(0);
  const [isSecond, setIsSecond] = useState(false);
  const [angleUnit, setAngleUnit] = useState("deg");
  const [darkTheme, setDarkTheme] = useState(true);

  // Handle button clicks based on their type (number, operator, clear, equals, memory, function)
  const handleButtonClick = (label, type) => {
    if (type === "number") {
      setDisplay(display + label); // Append number to display
    } else if (type === "operator") {
      setDisplay(display + " " + label + " "); // Append operator with spaces
    } else if (type === "clear") {
      setDisplay(""); // Clear display
    } else if (type === "equals") {
      try {
        // Evaluate the expression using eval (replace ÷ and × with / and *)
        const result = eval(display.replace("÷", "/").replace("×", "*"));
        setDisplay(result.toString());
        // Trigger confetti effect if display includes "5" and "6"
        if (display.includes("5") && display.includes("6")) {
          setConfetti(true);
          setTimeout(() => setConfetti(false), 3000);
        }
      } catch (error) {
        setDisplay("Error"); // Handle evaluation errors
      }
    } else if (type === "memory") {
      handleMemory(label); // Handle memory functions
    } else if (type === "function") {
      handleScientificFunction(label); // Handle scientific functions
    }
  };

  // Handle memory functions (MC, M+, M-, MR)
  const handleMemory = (label) => {
    const currentValue = parseFloat(display) || 0;
    switch (label) {
      case "MC":
        setMemory(0); // Clear memory
        break;
      case "M+":
        setMemory(memory + currentValue); // Add to memory
        break;
      case "M-":
        setMemory(memory - currentValue); // Subtract from memory
        break;
      case "MR":
        setDisplay(memory.toString()); // Recall memory
        break;
      default:
        break;
    }
  };

  // Handle scientific functions (2nd, +/-, %, x², x³, etc.)
  const handleScientificFunction = (label) => {
    let currentValue = parseFloat(display) || 0;
    let result;

    // Helper functions to convert between degrees and radians
    const toRadians = (angle) =>
      angleUnit === "deg" ? (angle * Math.PI) / 180 : angle;
    const toDegrees = (angle) =>
      angleUnit === "deg" ? (angle * 180) / Math.PI : angle;

    try {
      switch (label) {
        case "2nd":
          setIsSecond(!isSecond); // Toggle secondary functions
          return;
        case "+/-":
          result = -currentValue; // Negate current value
          break;
        case "%":
          result = currentValue / 100;
          break;
        case "x²":
          result = Math.pow(currentValue, 2);
          break;
        case "x³":
          result = Math.pow(currentValue, 3);
          break;
        case "xʸ":
          const power = parseFloat(prompt("Enter the exponent:")); // Prompt for exponent
          result = Math.pow(currentValue, power);
          break;
        case "eˣ":
          result = Math.exp(currentValue);
          break;
        case "10ˣ":
          result = Math.pow(10, currentValue);
          break;
        case "¹/x":
          result = 1 / currentValue; // Calculate reciprocal
          break;
        case "²√x":
          result = Math.sqrt(currentValue);
          break;
        case "³√x":
          result = Math.cbrt(currentValue);
          break;
        case "ʸ√x":
          const root = parseFloat(prompt("Enter the root value:")); // Prompt for root value
          result = Math.pow(currentValue, 1 / root); // Calculate y-th root
          break;
        case "ln":
          result = Math.log(currentValue); // Calculate natural logarithm
          break;
        case "log₁₀":
          result = Math.log10(currentValue);
          break;
        case "x!":
          result = math.factorial(currentValue);
          break;
        case "sin":
          result = Math.sin(toRadians(currentValue));
          break;
        case "cos":
          result = Math.cos(toRadians(currentValue));
          break;
        case "tan":
          result = Math.tan(toRadians(currentValue));
          break;
        case "sinh":
          result = Math.sinh(currentValue); // Calculate hyperbolic sine
          break;
        case "cosh":
          result = Math.cosh(currentValue);
          break;
        case "tanh":
          result = Math.tanh(currentValue);
          break;
        case "π":
          result = Math.PI;
          break;
        case "e":
          result = Math.E;
          break;
        case "EE":
          setDisplay(display + "e"); // Add scientific notation
          return;
        case "Rand":
          result = Math.random(); // Generate random number
          break;
        case "Rad":
          setAngleUnit(angleUnit === "deg" ? "rad" : "deg"); // Toggle angle unit
          return;
        default:
          result = currentValue; // Default case
      }
      setDisplay(result.toString());
    } catch (error) {
      setDisplay("Error"); // Handle errors
    }
  };

  // Toggle between dark and light themes
  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  return (
    <Container
      className={`${styles.container} ${
        darkTheme ? styles.dark : styles.light
      }`}
    >
      <button onClick={toggleTheme} className={styles.themeButton}>
        {darkTheme ? "Switch to Light Theme" : "Switch to Dark Theme"}
      </button>
      {confetti && <ConfettiExplosion />} {/* Show confetti explosion effect */}
      <Display value={display} theme={darkTheme ? "dark" : "light"} />{" "}
      {/* Display component */}
      <ButtonGrid>
        {calculatorButtons.map((button, index) => (
          <Button
            key={index}
            label={button.label}
            type={button.type}
            onClick={handleButtonClick}
            theme={darkTheme ? "dark" : "light"}
          />
        ))}
      </ButtonGrid>
    </Container>
  );
};

export default Calculator;

# ucznik

A dynamic quiz application built with vanilla JavaScript that fetches questions from a CSV file. Users can answer multiple-choice questions and receive a score along with the percentage of correct answers at the end.

## Features

- **Dynamic Question Loading**: Questions are loaded from a CSV file, making it easy to update the quiz content without changing the code.
- **Multiple-Choice Questions**: Supports up to five answer options for each question.
- **Random Question Order**: Questions are randomized each time the quiz is started.
- **Scoring System**: Tracks the number of correct answers and calculates the percentage score.
- **Dark Mode**: Users can switch between light and dark modes.
- **Image Support**: Display images alongside questions, if available.

## Usage

- On loading the page, the quiz will automatically fetch the questions from the `questions.csv` file.
- Users can select one or more answers (if applicable) and click the **Check Answer** button to submit their answer.
- After checking the answer, the **Next** button will appear to move to the next question.
- At the end of the quiz, the total score and percentage of correct answers will be displayed.

## Demo

You can try out the quiz application [https://zlyczarny.github.io/ucznik/](#).

## CSV File Format

The `questions.csv` file should be formatted as follows:

```plaintext
Question;Answer1;Answer2;Answer3;Answer4;Answer5;CorrectAnswers;ImageURL
```
Example:
```
What answer is correct?:\nChoose two:;A. <img src='images\1a.png'>;B;C;D;E;A.,C;images\1.png
```

------------
Special options: 
```
\n - next line in question or answer
<img src='images\77a.png'> - graphic in answer
const totalQuestions = 10; - set amount of asked questions in app.js
```


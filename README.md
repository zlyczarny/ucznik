# ucznik
The application is a web-based quiz platform designed to test users' knowledge through multiple-choice questions. Questions can be loaded via CSV file. The main features and functionalities of the application include:

Key Features:

    Multiple-Choice Questions:
        The application displays a series of questions, each with four possible answers. Some questions may have more than one correct answer.
        Questions are read from a CSV file, which includes the question text, possible answers, correct answers, and optionally an image related to the question.

    Image Support:
        If a question includes an image, it is displayed above the question text. This feature supports visual learning and adds context to the questions.

    Interactive Answer Selection:
        Users can select one or more answers by clicking on the corresponding buttons. Selected answers are highlighted in light blue.
        After selecting their answers, users can click the "Check Answer" button to submit their responses.

    Feedback Mechanism:
        Once the answers are submitted, the correct answers are highlighted in green, and incorrect selections are highlighted in red.
        This immediate feedback helps users understand their mistakes and learn from them.

    Scoring System:
        The application keeps track of the user’s score based on the correctness of their answers.
        At the end of the quiz (after 10 questions or the number of questions available), the application displays the final score.

    Dark Mode:
        Users can toggle between light and dark mode using a switch located at the top of the page.
        Dark mode settings are remembered between sessions using localStorage, ensuring the user's preferred theme is applied automatically upon returning to the site.

    Responsive Design:
        The application is designed to be responsive, ensuring that it works well on different screen sizes, from desktops to mobile devices.


Technical Overview:

    HTML/CSS/JavaScript:
        The front end is built using HTML, CSS, and vanilla JavaScript, making it lightweight and fast-loading.
    CSV Integration:
        Questions and answers are dynamically loaded from a CSV file, allowing easy updates to the question set without modifying the code.
    Dynamic Content:
        Questions are shuffled and displayed in random order to ensure that each quiz attempt is unique.
    Accessibility:
        The application is designed with accessibility in mind, including keyboard navigability and clear visual cues for selected and correct/incorrect answers.

Usage Scenario:

The application is ideal for educational purposes, where students or users can test their knowledge on a particular subject. It can be used in classrooms, self-study sessions, or even as a fun trivia game. The support for images and multiple correct answers makes it versatile for different types of quizzes, from simple fact-based questions to more complex scenarios requiring deeper understanding.

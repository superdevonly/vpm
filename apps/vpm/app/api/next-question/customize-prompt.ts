"use server"
import questionsFile from "../questions.json"

const music_prompt_categories = {
    "Realistic, People, Beach, Day, Natural light": "A photorealistic depiction of people enjoying a sunny day at the beach, with natural lighting highlighting the serene atmosphere.",
    "Anime, City, Abstract, Night, Neon lights": "A vibrant anime-style scene set in a bustling abstract cityscape at night, illuminated by neon lights and energetic vibes.",
    "Fantasy, Forest, Animals, Distant and alien, Soft light": "A fantasy art portrayal of mystical animals in an enchanted forest, bathed in soft light, creating a distant and alien yet inviting atmosphere.",
    "Sci-Fi, Space, Futuristic, Energetic and uplifting, Artificial light": "A dynamic sci-fi scene set in outer space, showcasing a futuristic and energetic vibe with artificial lighting accentuating the technological aspects.",
    "Cartoonish, Countryside, Nature, Peaceful and serene, Warm hues": "A cartoonish and cheerful representation of the countryside, filled with nature's beauty, evoking a peaceful and serene mood in warm hues.",
    "Abstract, Inside a building, Artistic, Dreamy and surreal, Diffused light": "An abstract, dreamy scene inside an artistically designed building, where surreal elements blend seamlessly under diffused lighting.",
    "Photorealistic, Underwater, Exploration, Calm and peaceful, Natural light": "A photorealistic underwater scene capturing the calm and peaceful essence of ocean exploration, with natural light filtering through the water.",
    "Fine Art, Outdoor Rave, Party, Inviting and welcoming, Colorful lighting": "A fine art depiction of an outdoor rave, bursting with life and energy, an inviting and welcoming atmosphere enhanced by colorful lighting.",
    "Illustrated animation, Shibuya, Urban, Dynamic and exciting, Bold colors": "An illustrated animation capturing the dynamic and exciting urban life of Shibuya, portrayed in bold and vibrant colors.",
    "Stop motion, Inside a house, Everyday life, Realistic and grounded, Soft light": "A stop-motion portrayal of everyday life inside a house, depicted in a realistic and grounded manner with soft lighting to emphasize coziness.",
     "Sci-Fi, Outer Space, Astronauts, Distant and alien, Hard light, Energetic and uplifting, Aerial Shot, Futuristic": "A futuristic sci-fi scene set in outer space, featuring astronauts in action, portrayed in a distant and alien yet energetically uplifting environment with hard lighting, captured from an aerial perspective to emphasize the vastness of the cosmos.",
    "Realistic, Tropical Vibes, Beach, Party, Vibrant and dynamic, Colorful lighting, Wide Shot, Present": "A photorealistic depiction of a vibrant beach party, full of tropical vibes. The scene is dynamic and lively, with colorful lighting enhancing the festive atmosphere, captured in a wide shot to encompass the energy of the present moment.",
    "Fantasy, Enchanted Forest, Mythical Creatures, Magical and enchanting, Soft light, Dreamy and surreal, Close up, Past": "A fantasy art portrayal of an enchanted forest, inhabited by mythical creatures. The setting is magical and enchanting, with dreamy and surreal elements brought to life under soft lighting, focusing closely on intricate details, reminiscent of tales from the past.",
    "Abstract, Underground, Dancers, Energetic and lively, Neon lights, Movement and stillness, Depth of Field, Future": "An abstract depiction of energetic dancers in an underground setting, illuminated by neon lights. The scene captures a juxtaposition of movement and stillness, with a depth of field technique that highlights the futuristic feel of the composition.",
    "Cartoonish, Countryside, Nature, Peaceful and serene, Natural light, Joyful, Aerial Shot, Specific time period (1980s)": "A cartoonish and idyllic representation of the countryside, brimming with nature's beauty in the 1980s. The scene exudes a peaceful and serene aura, bathed in natural light. The aerial shot adds a joyful perspective, capturing the essence of a simpler time.",
    "Anime, Shibuya, Nightlife, Dynamic and exciting, Neon and metallic, Energetic and uplifting, Wide Shot, Present": "An anime-inspired dynamic scene set in Shibuya's vibrant nightlife. The setting is filled with neon and metallic elements, creating an energetic and uplifting mood. Captured in a wide shot, it showcases the present-day pulsating energy of the city.",
    "Fine Art, Berlin Underground, Musicians, Melancholic and introspective, Warm hues, Calm and peaceful, Close up, Past": "A fine art depiction of musicians in the Berlin underground, portrayed in a melancholic and introspective mood. The scene, set in the past, is painted in warm hues, emphasizing a calm and peaceful atmosphere, with a close-up focus that invites reflection.",
    "Photorealistic, Cityscape, Sunrise, Inviting and welcoming, Vibrant and warm colors, Dreamy and surreal, Aerial Shot, Present": "A photorealistic aerial shot of a cityscape at sunrise, capturing the city's awakening in an inviting and welcoming manner. The vibrant and warm colors paint a dreamy and surreal picture, emphasizing the beauty and hope of the present day.",
    "Illustrated animation, Space, Exploration, Awe-inspiring and vast, Deep focus, Peaceful and serene, Wide Shot, Future": "An illustrated animation set in space, focusing on exploration themes. The scene is awe-inspiring and vast, rendered in deep focus to capture the peaceful and serene expanse of the cosmos, portrayed in a wide shot that hints at future possibilities.",
    "Stop motion, Indoor, Everyday life, Realistic and grounded, Soft and diffused light, Joyful, Depth of Field, Present": "A stop-motion depiction of everyday indoor life, portrayed in a realistic and grounded style. The scene is illuminated with soft and diffused lighting, creating a joyful ambiance. The depth of field technique adds a sense of intimacy and immediacy to the present moment.",
    "Abstract, Outdoor Rave, Movement and stillness, Neon lights, Energetic and uplifting, Wide Shot, Future": "An abstract representation of an outdoor rave in the future, where stillness and movement merge under neon lights, captured in a wide shot that embodies the energetic and uplifting spirit.",
    "Realistic, Countryside, Friends watching sunset, Warm hues, Peaceful and serene, Close up, Present": "A realistic close-up of friends enjoying a sunset in the countryside, the warm hues of the setting sun creating a peaceful and serene atmosphere, encapsulating the beauty of the present moment.",
    "Cartoonish, Underwater, Swimming in an ocean, Vibrant colors, Dreamy and surreal, Depth of Field, Past": "A cartoonish underwater scene set in the past, with vibrant colors portraying characters swimming in an ocean. The scene is dreamy and surreal, with a depth of field that adds a sense of whimsy.",
    "Sci-Fi, Inside a spaceship, Rave, Metallic and neon, Dynamic and exciting, Aerial Shot, Future": "A sci-fi scene inside a spaceship hosting a rave in the future, characterized by metallic and neon elements. The dynamic and exciting environment is captured from an aerial perspective, highlighting the lively atmosphere.",
    "Fine Art, Forest, Nature, Soft light, Calm and peaceful, Wide Shot, Specific time period (1960s)": "A fine art portrayal of a 1960s forest, where nature's tranquility is illuminated by soft light. The wide shot captures the calm and peaceful essence of the era, depicted in a style reminiscent of that time period.",
    "Anime, City at Night, Dynamic and exciting, Bright and bold colors, Energetic and uplifting, Close up, Present": "An anime scene of a city at night, filled with bright and bold colors. The close-up view captures the dynamic and exciting urban energy, reflecting an energetic and uplifting present-day atmosphere.",
    "Photorealistic, Inside a house, Everyday life, Natural and artificial light, Realistic and grounded, Depth of Field, Present": "A photorealistic depiction of everyday life inside a house, portrayed in a realistic and grounded manner. The interplay of natural and artificial light adds depth and authenticity to the scene, capturing the essence of present-day life.",
    "Illustrated animation, Shibuya at Night, Urban exploration, Neon lights, Vibrant and dynamic, Wide Shot, Present": "An illustrated animation of Shibuya at night, showcasing urban exploration in a vibrant and dynamic manner. The wide shot is filled with neon lights, emphasizing the energetic pulse of the present-day city.",
    "Stop motion, Tropical Beach, Party, Colorful and lively, Soft light, Joyful, Wide Shot, Present": "A stop-motion depiction of a party on a tropical beach, characterized by a colorful and lively atmosphere. The scene, captured in a wide shot under soft light, radiates a joyful and present-day vibrancy.",
    "Fantasy, Berlin Underground, Underground Rave, Mysterious and enchanting, Dark hues, Energetic and uplifting, Close up, Future": "A fantasy portrayal of a future underground rave in Berlin, imbued with a mysterious and enchanting aura. The close-up scene is set in dark hues, creating an energetic and uplifting atmosphere amidst the underground setting."

}

export default async function customizePrompt(responses: {[key: string]: string}, mode: string) {
    const questions = questionsFile;

    let finalPrompt: string;

    if (mode === "Music") {
        finalPrompt = await customizeMusicPrompt(responses, music_prompt_categories);
    } else if (mode === "Design") {
        finalPrompt = await customizeDesignPrompt(responses);
    } else if (mode === "Film") {
        finalPrompt = await customizeFilmPrompt(responses, questions.questions_data["Film"]);
    } else {
        return "Mode not recognized.";
    }

    return finalPrompt;
}

function customizeMusicPrompt(responses: {[key: string]: string}, promptCategories: {[key: string]: string}): string {
    const style: string = responses["What is the style of the images you want to generate?"] || "Default Style";
    const location: string = responses["Where do the visuals take place?"] || "Default Location";
    const subjects: string = responses["What type of subjects are in these visuals?"] || "Default Subjects";
    const timeOfDay: string = responses["Time of Day"] || "Anytime";
    const lighting: string = responses["What kind of lighting do you want in the images?"] || "Any";
    const mood: string = responses["What is the mood or tone of the image?"] || "Default Mood";
    const action: string = responses["Is there a main subject and action taking place?"] || "None";
    const era: string = responses["Is there any era, time period you imagine the visuals of your song in?"] || "Any";

    const promptKey: string = `${style}, ${subjects}, ${location}, ${timeOfDay}, ${lighting}, ${mood}, ${action}, ${era}`;
    const basePrompt: string = promptCategories[promptKey] || "A cinematic still from a film.";

    const additionalDetails: string[] = Object.values(responses);
    const finalPrompt: string = `${basePrompt}. Additional details: ${additionalDetails.join(', ')}`;

    return finalPrompt;
}

function customizeDesignPrompt(responses: {[key: string]: string}): string {
    const designKeys: string[] = [
        "What primary visual concept or theme should your design revolve around?",
        "Choose a color palette that best represents your design's mood or purpose.",
        // Add more keys as needed
    ];

    const finalPromptParts: string[] = [];
    const missingKeys: string[] = [];

    for (const key of designKeys) {
        const response: string | undefined = responses[key];
        if (response !== undefined) {
            finalPromptParts.push(response);
        } else {
            missingKeys.push(key);
        }
    }

    if (missingKeys.length > 0) {
        console.log("Missing responses for:", missingKeys.join(", "));
    }

    const basePrompt: string = "A customized design:";
    const finalPrompt: string = `${basePrompt} ${finalPromptParts.join(", ") || 'Default Design'}`;

    return finalPrompt;
}

function customizeFilmPrompt(responses: {[key: string]: string}, filmQuestions: {[key: number]: string[]}): string {
    const finalPromptParts: string[] = [];
    const missingKeys: string[] = [];

    const filmQuestionKeys: string[] | undefined = filmQuestions[12];
    if (filmQuestionKeys) {
        for (const key of filmQuestionKeys) {
            const response: string | undefined = responses[key];
            if (response) {
                finalPromptParts.push(response);
            } else {
                missingKeys.push(key);
                console.log(`Missing response for '${key}'`);
            }
        }
    }

    if (missingKeys.length > 0) {
        console.log("Missing responses for:", missingKeys.join(", "));
    }

    const basePrompt: string = "A detailed film concept:";
    const finalPrompt: string = `${basePrompt} ${finalPromptParts.join(", ") || 'Default Film Concept'}`;

    return finalPrompt;
}

const responsesExample: {[key: string]: string} = {
    "What primary visual concept or theme should your design revolve around?": "Nature and Environment",
    "Choose a color palette that best represents your design's mood or purpose.": "Earthy and Natural",
};
customizeDesignPrompt(responsesExample);

<template>
    <nav class="flex items-center justify-between bg-white shadow-md p-4">
        <ArrowLeft></ArrowLeft>
        <p>Event</p>
        <Share2></Share2>
    </nav>
    <div class="w-full ">
        <div class="bg-gray-300 flex justify-center items-center rounded-lg shadow-sm py-16">
            <!-- <p class="text-gray-700">No items in your box yet.</p> -->
            <Image class="w-24 h-24 text-gray-400" />
        </div>
    </div>
    <div class="flex flex-col justify-between mt-4 px-4 border-b-2 border-gray-200 pb-4">
        <h1 class="font-bold text-2xl">Expressive Portrait Drawing Workshop</h1>
        <div class="flex text-sm text-gray-600 gap-2 items-center mt-4">
            <CalendarDays></CalendarDays>
            <p>May 27, 2025 - 5:00 PM</p>
        </div>
        <div class="flex text-sm text-gray-600 gap-2 items-center mt-2">
            <MapPin></MapPin>
            <p>Atelier, ABBY Creative Space</p>
        </div>
        <div class="flex text-sm text-gray-600 gap-2 items-center mt-4">
            <p>Hosted by <a class="underline text-black" href="">Anna Johnson</a></p>
        </div>

        <button
            class="w-full bg-gray-600 text-white py-2 mt-4 rounded-full hover:bg-primary-700 transition-colors duration-200">
            Join event
        </button>
    </div>
    <div class="px-4 border-b-2 border-gray-200 pb-4">
        <div class="flex justify-between items-center mt-4">
            <p class="text-lg font-bold">Participants (12)</p>
            <p class="text-gray-600">See all</p>
        </div>
        <!-- // i want the icons to be in a row, but overlapping each other -->
        <div className="flex items-center mt-2">
            <div className="z-10 w-12 h-12 -ml-0 bg-gray-300 flex items-center justify-center rounded-full">
                <CircleUserRound className="text-gray-600 w-full h-full" />
            </div>
            <div className="bg-gray-300 w-12 h-12 z-20 flex items-center justify-center rounded-full -ml-4">
                <CircleUserRound className="text-gray-600 w-full h-full" />
            </div>
            <div className="bg-gray-300 w-12 h-12 z-20 flex items-center justify-center rounded-full -ml-4">
                <CircleUserRound className="text-gray-600 w-full h-full" />
            </div>
            <div className="bg-gray-300 w-12 h-12 z-20 flex items-center justify-center rounded-full -ml-4">
                <CircleUserRound className="text-gray-600 w-full h-full" />
            </div>
            <div className="bg-gray-300 w-12 h-12 z-20 flex items-center justify-center rounded-full -ml-4">
                <CircleUserRound className="text-gray-600 w-full h-full" />
            </div>
            <div className="bg-gray-300 w-12 h-12 z-20 flex items-center justify-center rounded-full -ml-4">
                <p>+8</p>
            </div>
        </div>
    </div>
    <div class="p-4 border-b-2 border-gray-200">

        <p class="text-lg font-bold">Event rewards</p>
        <div class="grid grid-cols-2 gap-4 mt-2">
            <div class="border-2 border-gray-200 gap-3 rounded-lg flex flex-col items-center py-8">
                <Image></Image>
                <p class="text-xs text-gray-600">Complete this event <br>to collect the reward</p>

            </div>
            <div class="border-2 border-gray-200 gap-3 rounded-lg flex flex-col items-center py-8">
                <Image></Image>
                <p class="text-xs text-gray-600">Complete this event <br>to collect the reward</p>

            </div>

        </div>
    </div>

    <div class="p-4 border-b-2 border-gray-200">
        <p class="text-lg font-bold">About</p>
        <p class="mt-4 text-gray-600">Join us for an immersive portrait drawing workshop where you'll learn techniques
            to capture emotion and
            personality in your artwork. Perfect for beginners and intermediate artists looking to enhance their skills.
            <br><br>
            This workshop focuses on expressive portrait techniques using charcoal and graphite. You'll learn about
            facial proportions, capturing likeness, and adding emotional depth to your portraits. By the end, you'll
            have completed at least one finished portrait piece to take home.
        </p>
    </div>
    <div class="p-4 border-b-2 border-gray-200">
        <p class="text-lg font-bold">Material to bring</p>
        <ul>
            <li class="flex items-center gap-2 mt-4">
                <Check class="text-gray-600 inline-block mr-2" />
                <p>Paper or sketchbook</p>
            </li>
            <li class="flex items-center gap-2 mt-2">
                <Check class="text-gray-600 inline-block mr-2" />
                <p>Set of graphite pencils (2H to 6B)</p>
            </li>
            <li class="flex items-center gap-2 mt-2">
                <Check class="text-gray-600 inline-block mr-2" />
                <p>Eraser and blending tools</p>
            </li>
            <li class="flex items-center gap-2 mt-2">
                <Check class="text-gray-600 inline-block mr-2" />
                <p>Reference photos (optional)</p>
            </li>
        </ul>
    </div>
    <div class="p-4 border-b-2 border-gray-200">
        <p class="text-lg font-bold">You might also like</p>
        <div class="border-2 border-gray-300 rounded-lg mt-4">
            <div class="bg-gray-300 p-4">
                <Image class="w-full h-36 object-cover text-gray-600 rounded-lg mt-4" />

            </div>
            <div class="p-4">
                <p>Morning crocheting with Emily</p>
                <p class="text-xs text-gray-600">Jun 15, 2025 - Atelier</p>
            </div>

        </div>
        <div class="border-2 border-gray-300 rounded-lg mt-4">
            <div class="bg-gray-300 p-4">
                <Image class="w-full h-36 object-cover text-gray-600 rounded-lg mt-4" />

            </div>
            <div class="p-4">
                <p>Yoga for beginners</p>
                <p class="text-xs text-gray-600">Jun 15, 2025 - Atelier</p>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
import {
    CircleUserRound,
    Pencil,
    ArrowLeft,
    Image,
    User,
    Award,
    CalendarDays,
    Share2,
    MapPin,
    Check
} from "lucide-vue-next";

export default {
    components: {
        CircleUserRound,
        Pencil,
        ArrowLeft,
        Image,
        User,
        Award,
        CalendarDays,
        Share2,
        MapPin,
        Check
    },

    setup() {
        return {};
    },
};
</script>
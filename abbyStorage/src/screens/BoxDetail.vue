<template>
    <nav class="flex items-center justify-between bg-white shadow-md p-4 border-b border-gray-200">
        <div class="">
            <ArrowLeft class="w-8 h-auto text-gray-700" />
        </div>

        <p class="text-lg font-medium text-center flex-1">Box</p>

        <Share2 class="w-6 h-6 text-gray-600" />
    </nav>
    <div class="flex gap-4 items-center bg-white p-4 border-b border-gray-200">
        <CircleUserRound class="w-12 h-12 text-gray-600"></CircleUserRound>
        <div class="flex flex-col">
            <p class=" text-lg font-bold">Jamie Parker</p>
            <p class="text-xs">Dreamer, painter, coffee lover</p>
        </div>
        <button
            class="bg-gray-600 font-medium text-white py-2 px-3 w-fit rounded-full hover:bg-primary-700 transition-colors duration-200 whitespace-nowrap">
            View profile
        </button>


    </div>

    <div class="flex gap-4 justify-between items-center text-sm text-gray-600 bg-white p-4 border-b border-gray-200">
        <div class="flex items-center gap-2">
            <!-- <Award class="w-8 h-8 " /> -->
            <p>Box #123</p>
        </div>
        <div class="flex items-center gap-2">
            <!-- <CalendarDays class="w-fit h-8 " /> -->
            <p>Created on <br> 12/10/2023</p>
        </div>
        <!-- <div class="flex items-center gap-2">
            <Pencil class="w-8 h-8 text-gray-600" />
            <p>Edit box</p>

        </div> -->
    </div>
    <div class="w-full max-w-md mx-auto">
        <div class="aspect-square bg-gray-300 flex justify-center items-center rounded-lg shadow-sm">
            <Image class="w-24 h-24 text-gray-400" />
        </div>
    </div>
    <div class="flex justify-between bg-white items-center p-4 border-b border-gray-200">
        <div class="flex gap-4 justify-center">
            <div class="flex items-center gap-2">
                <Heart class="w-8 h-8 text-gray-600" />
                <p>43</p>
            </div>
            <div class="flex items-center gap-2">
                <MessageSquare class="w-8 h-8 text-gray-600" />
                <p>4</p>
            </div>
        </div>

        <div class="flex items-center gap-2">
            <Eye class="w-8 h-8 text-gray-600" />
            <p>320</p>
        </div>
    </div>

    <div class="p-4 border-b-2 border-gray-200 bg-white">
        <p class="text-lg font-bold">Items inside</p>
        <div class="grid grid-cols-2 gap-4">

            <div class="border-2 border-gray-300 rounded-lg mt-4">
                <div class="bg-gray-300 p-4">
                    <Image class="w-full h-14 object-cover text-gray-600 rounded-lg" />

                </div>
                <div class="p-4">
                    <p>Dried Lavender</p>
                </div>

            </div>
            <div class="border-2 border-gray-300 rounded-lg mt-4">
                <div class="bg-gray-300 p-4">
                    <Image class="w-full h-14 object-cover text-gray-600 rounded-lg" />

                </div>
                <div class="p-4">
                    <p>Tiny Origami Crane</p>
                </div>

            </div>
            <div class="border-2 border-gray-300 rounded-lg mt-4">
                <div class="bg-gray-300 p-4">
                    <Image class="w-full h-14 object-cover text-gray-600 rounded-lg" />

                </div>
                <div class="p-4">
                    <p>A broken paintbrush</p>
                </div>

            </div>
            <div class="border-2 border-gray-300 rounded-lg mt-4">
                <div class="bg-gray-300 p-4">
                    <Image class="w-full h-14 object-cover text-gray-600 rounded-lg" />

                </div>
                <div class="p-4">
                    <p>A yellow button</p>
                </div>

            </div>

        </div>
    </div>

    <div class="p-4 border-b-2 border-gray-200 bg-white">
        <div class="flex justify-between items-center">
            <p>8 comments</p>
            <p>See all</p>

        </div>
        <div class="flex gap-4 items-center mt-4">
            <div>
                <CircleUserRound class="w-12 h-12" />
            </div>
            <div class="relative w-full">
                <textarea
                    class="bg-gray-100 rounded-xl px-4 py-2 pr-10 w-full resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                    name="comment" id="comment" rows="1" placeholder="Add a comment..."></textarea>

                <!-- Example icon (e.g. a send icon) -->
                 <SendHorizonal class="w-6 h-6 text-gray-600 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" />
                <!-- <svg xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7" />
                </svg> -->
            </div>
        </div>
        <div class="flex gap-4 items-start mt-4">
            <div>
                <CircleUserRound class="w-12 h-12" />
            </div>
            <div>
                <div class="flex items-baseline gap-2">
                    <p class="font-bold">@maximtamp</p>
                    <p class="text-sm">13 hours ago</p>

                </div>
                <p class="text-sm mt-2">
                    That broken brush says more than most finished paintings. Thank you for sharing something so real
                </p>
                <div class="flex items-center gap-2 mt-2 text-sm">
                    <div class="flex items-center gap-1">
                        <Heart class="w-6 h-6 text-gray-600" />
                        <p>4</p>

                    </div>
                    <p>Reply</p>
                </div>
                <div class="flex items-center gap-1 mt-4 text-">
                    <ChevronDown class="w-6 h-6 text-gray-600" />
                    <p>9 replies</p>

                </div>
            </div>
        </div>
        <div class="flex gap-4 items-start mt-4">
            <div>
                <CircleUserRound class="w-12 h-12" />
            </div>
            <div>
                <div class="flex items-baseline gap-2">
                    <p class="font-bold">@maximtamp</p>
                    <p class="text-sm">13 hours ago</p>

                </div>
                <p class="text-sm mt-2">
                    That broken brush says more than most finished paintings. Thank you for sharing something so real
                </p>
                <div class="flex items-center gap-2 mt-2 text-sm">
                    <div class="flex items-center gap-1">
                        <Heart class="w-6 h-6 text-gray-600" />
                        <p>4</p>

                    </div>
                    <p>Reply</p>
                </div>
                <div class="flex items-center gap-1 mt-4 text-">
                    <ChevronDown class="w-6 h-6 text-gray-600" />
                    <p>9 replies</p>

                </div>
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
    Star,
    Heart,
    MessageSquare,
    Eye,
    ChevronDown,
    SendHorizonal
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
        Star,
        Heart,
        MessageSquare,
        Eye,
        ChevronDown,
        SendHorizonal
    },

    setup() {
        return {};
    },
};
</script>

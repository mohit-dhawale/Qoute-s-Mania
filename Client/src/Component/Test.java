package Component;

import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

class Test{0
    public String LetterCount(String str){
        String[] words = str.split("\\s+");

        // Initialize variables to keep track of the word with the most repeated letters
        int maxRepeatedLetters = 0;
        String wordWithMaxRepeatedLetters = "";

        // Iterate through each word in the array
        for (String word : words) {
            // Count the occurrences of each letter in the word
            Map<Character, Integer> letterCount = new HashMap<>();
            for (char letter : word.toCharArray()) {
                letterCount.put(letter, letterCount.getOrDefault(letter, 0) + 1);
            }

            // Find the maximum count of repeated letters in the word
            int maxCount = letterCount.values().stream().max(Integer::compareTo).orElse(0);

            // Update the result if the current word has more repeated letters
            if (maxCount > maxRepeatedLetters) {
                maxRepeatedLetters = maxCount;
                wordWithMaxRepeatedLetters = word;
            }
        }

        // Check if any word has repeated letters
        if (maxRepeatedLetters > 1) {
            return wordWithMaxRepeatedLetters;
        } else {
            return "-1" ;
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String str = sc.nextLine();
        String i=new Test().LetterCount(str);
        System.out.println(i);
    }
}
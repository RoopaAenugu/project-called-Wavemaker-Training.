package com.javatraining;

import java.util.Scanner;

public class NumberGuessingGame {
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        int c = (int) Math.ceil(Math.random() * 100);
        while (true) {
            System.out.println("enter value");
            int k=sc.nextInt();
            if(k<c){
                System.out.println("enter value is too low");
            }
            else if(k>c){
                System.out.println("enter value is too high");
            }
            else{
                System.out.println("congratulations your value is correct");
                break;
            }


        }
    }



}

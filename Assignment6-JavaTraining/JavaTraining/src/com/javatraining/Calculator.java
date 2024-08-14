package com.javatraining;

import java.math.BigInteger;
import java.sql.SQLOutput;
import java.util.Scanner;

public class Calculator {
    public static void main(String[] args) {
        while (true) {
            Scanner sc = new Scanner(System.in);
            System.out.println("enter yes to exit");
            String s = sc.nextLine();
            if(s.equals("yes")){
                break;
            }
            System.out.println("enter a value");
            BigInteger a = sc.nextBigInteger();
            System.out.println("enter b value");
            BigInteger b = sc.nextBigInteger();
            BigInteger c = null;
            System.out.println("enter operator");
            char ch = sc.next().charAt(0);
            switch (ch) {
                case '+':
                    c = a.add(b);
                    break;
                case '-':
                    c = a.subtract(b);
                    break;
                case '*':
                    c = a.multiply(b);
                    break;
                case '/':
                    c = a.divide(b);
                    break;
                default:
                    System.out.println("invalid operator");


            }
            System.out.println(c);
        }
    }

}

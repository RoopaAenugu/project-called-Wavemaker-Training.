package com.javatraining;

public class Employee {
   public  String s="roopa";
    private int empId=1;
    int i=1;

    public static void main(String[] args){

        Employee emp=new Employee();
        emp.test(emp);
        System.out.println((emp.i));
    }
    public void test(Employee e){
        e.i=10;
        System.out.print(i);

    }
}

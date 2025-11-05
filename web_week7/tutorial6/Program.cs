using System;

namespace LabExerciseCSharp
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("================ LAB EXERCISES ================\n");

            // Lab 1 - for loop
            Console.WriteLine("Lab 1: For Loop (0-10)");
            for (int i = 0; i <= 10; i++)
                Console.Write(i + " ");
            Console.WriteLine("\n");

            // Lab 2 - while loop
            Console.WriteLine("Lab 2: While Loop (0-10)");
            int j = 0;
            while (j <= 10)
            {
                Console.Write(j + " ");
                j++;
            }
            Console.WriteLine("\n");

            // Lab 3 - do while loop
            Console.WriteLine("Lab 3: Do-While Loop (0-10)");
            int k = 0;
            do
            {
                Console.Write(k + " ");
                k++;
            } while (k <= 10);
            Console.WriteLine("\n");

            // Lab 4 - Divisible by 3 and 4
            Console.WriteLine("Lab 4: Numbers 0-100 divisible by 3 and 4");
            for (int x = 0; x <= 100; x++)
            {
                if (x % 3 == 0 && x % 4 == 0)
                    Console.Write(x + " ");
            }
            Console.WriteLine("\n");

            // Lab 6 - Car class test
            Console.WriteLine("Lab 6: Car Class Example");
            Car myCar = new Car("Toyota", "Corolla", "Blue", "ABC-123");
            Console.WriteLine(myCar);

            // Lab 7 - Calculator with exception handling
            Console.WriteLine("\nLab 7: Simple Calculator with Exception Handling");
            try
            {
                Console.Write("Enter first number: ");
                double num1 = Convert.ToDouble(Console.ReadLine());

                Console.Write("Enter operator (+, -, *, /): ");
                char op = Convert.ToChar(Console.ReadLine());

                Console.Write("Enter second number: ");
                double num2 = Convert.ToDouble(Console.ReadLine());

                double result = op switch
                {
                    '+' => num1 + num2,
                    '-' => num1 - num2,
                    '*' => num1 * num2,
                    '/' => num2 != 0 ? num1 / num2 : throw new DivideByZeroException(),
                    _ => throw new InvalidOperationException("Invalid operator.")
                };

                Console.WriteLine($"Result: {num1} {op} {num2} = {Math.Round(result, 2)}");
            }
            catch (FormatException)
            {
                Console.WriteLine("Error: Invalid number format.");
            }
            catch (DivideByZeroException)
            {
                Console.WriteLine("Error: Cannot divide by zero.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Unexpected error: {ex.Message}");
            }
            finally
            {
                Console.WriteLine("\nCalculator execution finished.");
            }
        }
    }

    public class Car
    {
        public string Make { get; set; }
        public string Model { get; set; }
        public string Colour { get; set; }
        public string RegistrationNumber { get; }

        public Car(string make, string model, string colour, string reg)
        {
            Make = make;
            Model = model;
            Colour = colour;
            RegistrationNumber = reg;
        }

        public override string ToString()
        {
            return $"Car Info: {Make} {Model} ({Colour}) - Reg#: {RegistrationNumber}";
        }
    }
}
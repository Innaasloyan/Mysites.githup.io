import java.io.IOException;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        DataProcessor processor = new DataProcessor();
        
        try {
            // Чтение данных из файла
            processor.readFromFile("people.txt");
            
            // Вывод исходных данных
            System.out.println("Исходные данные:");
            processor.printData();

            // Сортировка по возрасту
            processor.sortByAge();
            System.out.println("\nДанные после сортировки по возрасту:");
            processor.printData();

            // Фильтрация по возрасту
            System.out.print("\nВведите минимальный возраст для фильтрации: ");
            int minAge = scanner.nextInt();
            scanner.nextLine();  // consume newline
            System.out.println("\nОтфильтрованные данные:");
            processor.filterByAge(minAge).forEach(System.out::println);

            // Ввод новых данных
            System.out.print("\nВведите имя нового человека: ");
            String name = scanner.nextLine();
            System.out.print("Введите возраст нового человека: ");
            int age = scanner.nextInt();
            processor.addPerson(name, age);

            // Сохранение данных в файл
            processor.writeToFile("people.txt");
            System.out.println("\nНовые данные сохранены в файл.");

        } catch (IOException e) {
            System.out.println("Ошибка при работе с файлом: " + e.getMessage());
        } finally {
            scanner.close();
        }
    }
}

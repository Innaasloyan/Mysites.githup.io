import java.io.*;
import java.util.*;
import java.util.stream.Collectors;

public class DataProcessor {
    private List<Person> people;

    public DataProcessor() {
        this.people = new ArrayList<>();
    }

    // Чтение данных из файла
    public void readFromFile(String filename) throws IOException {
        try (BufferedReader reader = new BufferedReader(new FileReader(filename))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] parts = line.split(",");
                if (parts.length == 2) {
                    String name = parts[0].trim();
                    int age = Integer.parseInt(parts[1].trim());
                    people.add(new Person(name, age));
                }
            }
        }
    }

    // Запись данных в файл
    public void writeToFile(String filename) throws IOException {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filename))) {
            for (Person person : people) {
                writer.write(person.toString());
                writer.newLine();
            }
        }
    }

    // Сортировка по возрасту
    public void sortByAge() {
        people.sort(Comparator.comparingInt(Person::getAge));
    }

    // Фильтрация по возрасту
    public List<Person> filterByAge(int minAge) {
        return people.stream()
                     .filter(person -> person.getAge() >= minAge)
                     .collect(Collectors.toList());
    }

    // Вывод данных
    public void printData() {
        for (Person person : people) {
            System.out.println(person);
        }
    }

    // Добавление нового человека
    public void addPerson(String name, int age) {
        people.add(new Person(name, age));
    }
}

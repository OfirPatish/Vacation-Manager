class Config {
  // Only useful for local development
  public port: number = 8080;
  public host: string = "localhost";
  // public mySQLHost: string = "localhost" -> Connects to MySQL running on the same machine as the application
  // public mySQLHost: string = "host.docker.internal" -> Connects to MySQL running on the host machine from within a Docker container
  // public mySQLHost: string = "mysql" -> Connects to MySQL service defined in the same Docker Compose network
  public mySQLHost: string = "localhost";
  public mySQLUser: string = "root";
  public mySQLPassword: string = "12345678"; // either 9523@!Op or 12345678 (Mac won't allow weak passwords).
  public mySQLDatabase: string = "vacationdb";
}

const config = new Config();
export default config;

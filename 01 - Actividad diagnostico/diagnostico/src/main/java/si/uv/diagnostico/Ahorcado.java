package si.uv.diagnostico;

public class Ahorcado {
    private String palabra;
    private int errores;
    public Ahorcado(String palabra, int errores) {
        this.palabra = palabra;
        this.errores = errores;
    }
    @Override
    public String toString() {
        return "Ahorcado [errores=" + errores + ", palabra=" + palabra + "]";
    }
    public String getPalabra() {
        return palabra;
    }
    public void setPalabra(String palabra) {
        this.palabra = palabra;
    }
    public int getErrores() {
        return errores;
    }
    public void setErrores(int errores) {
        this.errores = errores;
    }
    
}

import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  estados: any[] = [];
  categorias: any[] = [];
  categoria = { nome: '', ativo: true };
  estado = { nome: '', sigla: '', ativo: true };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.carregarCategorias();
    this.carregarEstados();
  }

  // Método para carregar categorias
  carregarCategorias() {
    console.log('Carregando categorias...');
    this.http.get<any[]>('http://localhost:8080/categorias')
      .pipe(
        tap((data) => {
          console.log('Categorias carregadas:', data);
          this.categorias = data;
        }),
        catchError((error) => {
          console.error('Erro ao carregar categorias:', error);
          return throwError(() => error);
        })
      )
      .subscribe();
  }

  // Método para carregar estados
  carregarEstados() {
    console.log('Carregando estados...');
    this.http.get<any[]>('http://localhost:8080/estados')
      .pipe(
        tap((data) => {
          console.log('Estados carregados:', data);
          this.estados = data;
        }),
        catchError((error) => {
          console.error('Erro ao carregar estados:', error);
          return throwError(() => error);
        })
      )
      .subscribe();
  }

  // Método para enviar categoria
  submitCategoria() {
    console.log('Enviando categoria:', this.categoria);
    this.http.post('http://localhost:8080/categorias', this.categoria, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      tap((response) => {
        console.log('Categoria enviada com sucesso:', response);
        this.carregarCategorias();
        this.resetCategoria();
      }),
      catchError((error) => {
        console.error('Erro ao adicionar categoria:', error);
        alert('Erro ao enviar categoria. Tente novamente!');
        return throwError(() => error);
      })
    ).subscribe();
  }

  // Método para enviar estado
  submitEstado() {
    console.log('Enviando estado:', this.estado);
    this.http.post('http://localhost:8080/estados', this.estado, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      tap((response) => {
        console.log('Estado enviado com sucesso:', response);
        this.carregarEstados();
        this.resetEstado();
      }),
      catchError((error) => {
        console.error('Erro ao adicionar estado:', error);
        alert('Erro ao enviar estado. Tente novamente!');
        return throwError(() => error);
      })
    ).subscribe();
  }

  // Método para resetar o formulário de categoria
  resetCategoria() {
    this.categoria = { nome: '', ativo: true };
  }

  // Método para resetar o formulário de estado
  resetEstado() {
    this.estado = { nome: '', sigla: '', ativo: true };
  }
}

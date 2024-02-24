
import ColecaoCliente from "@/backend/db/colecaoCliente.service";
import Botao from "@/components/botao";
import Formulario from "@/components/formulario";
import Layout from "@/components/layout";
import Tabela from "@/components/tabela";
import Cliente from "@/core/cliente";
import ClienteRepositorio from "@/core/clienteRepositorio";
import { useEffect, useState } from "react";

export default function Home() {  

  const repo: ClienteRepositorio = new ColecaoCliente()  

  // const clientes = [
  //   new Cliente('Ana', 34, '1'),
  //   new Cliente('Bia', 45, '2'),
  //   new Cliente('Carlos', 23, '3'),
  //   new Cliente('Pedro', 54, '4')
  // ]  

  function clienteSelecionado(cliente: Cliente) {
    console.log(cliente.nome)
    setCliente(cliente)
    setVisivel('form')
  }

  async function clienteExcluido(cliente: Cliente) {
    console.log('aaaaaaaa')
    repo.excluir(cliente)
    obterTodosClientes()
  }

  function novoCliente() {
    console.log('testando onclick botao')
    setCliente(Cliente.vazio())
    setVisivel('form')
  }

  async function salvarCliente(cliente: any) {
    console.log(cliente, 'testando submit formulario')    
    await repo.salvar(cliente)
    obterTodosClientes()
    setVisivel('tabela')
  }

  const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela')
  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio())
  const [clientes, setClientes] = useState<Cliente[]>([])

  useEffect(() => {
    console.log('useEfect')
    obterTodosClientes()
  }, [])  

  async function obterTodosClientes() {
    console.log('aki')
    await repo.obterTodos().then(clientes => {
      console.log(clientes, 'todos clientes')
      setClientes(clientes)
      setVisivel('tabela')
    })
  }  

  return (
    <div className={`flex h-screen justify-center items-center
    bg-gradient-to-r from-blue-500 to-purple-500 
    text-white`
    }>
      <Layout titulo="Cadastro Simples">
        {visivel === 'tabela' ? (
          <>

            <div className="flex justify-end">
              <Botao cor="green" className="mb-4" onClick={novoCliente}>Novo Cliente</Botao>
            </div>

            <Tabela
              clientes={clientes}
              clienteSelecionado={clienteSelecionado}
              clienteExcluido={clienteExcluido}
            >
            </Tabela>
          </>

        ) : (
          <Formulario cliente={cliente} clienteMudou={salvarCliente} cancelado={() => setVisivel('tabela')}></Formulario>
        )}



      </Layout>
    </div>
  );
}

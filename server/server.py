from flask import Flask
from flask import request, redirect, url_for
from flask_cors import CORS
import psycopg2
import psycopg2.extras

## SGBD configs
DB_HOST = "dpg-coj6t28l5elc73dj5dfg-a"
DB_USER = "eduvedras"
DB_DATABASE = "ivm"
DB_PASSWORD = "7am5RGIfEIHqoCxilMOnJfw89OSBJcSp"
DB_CONNECTION_STRING = "host=%s dbname=%s user=%s password=%s" % (
    DB_HOST,
    DB_DATABASE,
    DB_USER,
    DB_PASSWORD,
)

app = Flask(__name__)
CORS(app)


@app.route("/api/categorias")
def listar_categorias():
    dbConn = None
    cursor = None
    try:
        dbConn = psycopg2.connect(DB_CONNECTION_STRING)
        cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)
        query = "SELECT * FROM categoria;"
        cursor.execute(query)
        return cursor.fetchall()
    except Exception as e:
        return str(e)
    finally:
        cursor.close()
        dbConn.close()

@app.route("/api/categorias/remove")
def remover_categoria():
    dbConn = None
    cursor = None
    try:
        dbConn = psycopg2.connect(DB_CONNECTION_STRING)
        cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)
        categoria = request.args["cat"]
        query = "DELETE FROM categoria WHERE nome=%s;"
        data = (categoria,)
        cursor.execute(query, data)
        return redirect(url_for("listar_categorias"))
    except Exception as e:
        return str(e)
    finally:
        dbConn.commit()
        cursor.close()
        dbConn.close()

@app.route("/api/categorias/select")
def listar_categoria_selecionada():
    dbConn = None
    cursor = None
    try:
        dbConn = psycopg2.connect(DB_CONNECTION_STRING)
        cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)
        categoria = request.args["cat"]
        data = (categoria,)
        query = "SELECT * from tem_outra WHERE super_categoria=%s;"
        cursor.execute(query,data)
        return cursor.fetchall()
    except Exception as e:
        return str(e)
    finally:
        dbConn.commit()
        cursor.close()
        dbConn.close()

@app.route('/api/categorias/execute_insert')
def insert_categoria_intoDB():
  dbConn=None
  cursor=None
  try:
    dbConn = psycopg2.connect(DB_CONNECTION_STRING)
    cursor = dbConn.cursor(cursor_factory = psycopg2.extras.DictCursor)
    query = "INSERT INTO categoria VALUES (%s);"
    data = (request.args["nome"],)
    cursor.execute(query,data)
    return redirect(url_for('listar_categorias'))
  except Exception as e:
    return str(e)
  finally:
    dbConn.commit()
    cursor.close()
    dbConn.close()


@app.route('/api/categorias/execute_insert_sub')
def insert_categoriasub_intoDB():
  dbConn=None
  cursor=None
  try:
    dbConn = psycopg2.connect(DB_CONNECTION_STRING)
    cursor = dbConn.cursor(cursor_factory = psycopg2.extras.DictCursor)
    query1 = "INSERT INTO categoria VALUES (%s);"
    query2 = "INSERT INTO categoria_simples VALUES (%s);"
    query3 = "INSERT INTO tem_outra VALUES (%s,%s);"
    nome = request.args["nome"].split(",")[0]
    nome_super = request.args["nome"].split(",")[1]
    print(nome)
    print(nome_super)
    data1 = (nome,)
    data2 = (nome,)
    data3 = (nome_super,nome,)
    cursor.execute(query1,data1)
    cursor.execute(query2,data2)
    cursor.execute(query3,data3)
    return redirect(url_for('listar_categorias'))
  except Exception as e:
    return str(e)
  finally:
    dbConn.commit()
    cursor.close()
    dbConn.close()

@app.route("/api/IVM")
def listar_IVM():
    dbConn = None
    cursor = None
    try:
        dbConn = psycopg2.connect(DB_CONNECTION_STRING)
        cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)
        query = "SELECT * from IVM;"
        cursor.execute(query)
        return cursor.fetchall()
    except Exception as e:
        return str(e)
    finally:
        dbConn.commit()
        cursor.close()
        dbConn.close()

@app.route("/api/IVM/select")
def listar_IVM_selecionada():
    dbConn = None
    cursor = None
    try:
        dbConn = psycopg2.connect(DB_CONNECTION_STRING)
        cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)
        IVM = request.args["IVM"]
        data = (IVM,)
        query = "SELECT * from evento_reposicao where num_serie=%s;"
        cursor.execute(query,data)
        return cursor.fetchall()
    except Exception as e:
        return str(e)
    finally:
        dbConn.commit()
        cursor.close()
        dbConn.close()

@app.route("/api/retalhistas")
def listar_retalhistas():
    dbConn = None
    cursor = None
    try:
        dbConn = psycopg2.connect(DB_CONNECTION_STRING)
        cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)
        query = "SELECT * FROM retalhista;"
        cursor.execute(query)
        return cursor.fetchall()
    except Exception as e:
        return str(e)
    finally:
        cursor.close()
        dbConn.close()

@app.route('/api/retalhistas/execute_insert')
def insert_retalhista_intoDB():
  dbConn=None
  cursor=None
  try:
    dbConn = psycopg2.connect(DB_CONNECTION_STRING)
    cursor = dbConn.cursor(cursor_factory = psycopg2.extras.DictCursor)
    query = "INSERT INTO retalhista VALUES (%s,%s);"
    tin = request.args["ret"].split(',')[0]
    nome = request.args["ret"].split(',')[1]
    data = (tin,nome,)
    cursor.execute(query,data)
    return redirect(url_for('listar_retalhistas'))
  except Exception as e:
    return str(e)
  finally:
    dbConn.commit()
    cursor.close()
    dbConn.close()


@app.route("/api/retalhistas/remove")
def remover_retalhista():
    dbConn = None
    cursor = None
    try:
        dbConn = psycopg2.connect(DB_CONNECTION_STRING)
        cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)
        retalhista = request.args["tin"]
        query = "DELETE FROM retalhista WHERE tin=%s;"
        data = (retalhista,)
        cursor.execute(query, data)
        return redirect(url_for('listar_retalhistas'))
    except Exception as e:
        return str(e)
    finally:
        dbConn.commit()
        cursor.close()
        dbConn.close()

if __name__ == "__main__":
    app.run(debug=True)


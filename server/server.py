from flask import Flask
from flask import render_template, jsonify,request, redirect, url_for
import psycopg2
import psycopg2.extras

#app = Flask(__name__)

#@app.route("/api/members")
#def members():
#    return {"members": ["Member1", "Member2", "Member3"]}

## SGBD configs
DB_HOST = "127.0.0.1"
DB_USER = "postgres"
DB_DATABASE = "testdb"
DB_PASSWORD = "postgres"
DB_CONNECTION_STRING = "host=%s dbname=%s user=%s password=%s" % (
    DB_HOST,
    DB_DATABASE,
    DB_USER,
    DB_PASSWORD,
)

app = Flask(__name__)


@app.route("/api")
def main():
    try:
        return render_template("index.html")
    except Exception as e:
        return str(e)  # Renders a page with the error.


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
'''
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
        return render_template("sub_cat.html", cursor=cursor)
    except Exception as e:
        return str(e)
    finally:
        dbConn.commit()
        cursor.close()
        dbConn.close()

@app.route("/api/categorias/inserir_cat")
def inserir_categoria():
    dbConn = None
    cursor = None
    try:
        return render_template("inserir_cat.html")
    except Exception as e:
        return str(e)

@app.route("/api/categorias/inserir_subcat")
def inserir_subcategoria():
    dbConn = None
    cursor = None
    try:
        return render_template("inserir_subcat.html")
    except Exception as e:
        return str(e)


@app.route('/api/categorias/execute_insert', methods=["POST"])
def insert_categoria_intoDB():
  dbConn=None
  cursor=None
  try:
    dbConn = psycopg2.connect(DB_CONNECTION_STRING)
    cursor = dbConn.cursor(cursor_factory = psycopg2.extras.DictCursor)
    query = "INSERT INTO categoria VALUES (%s);"
    data = (request.form["nome"],)
    cursor.execute(query,data)
    return redirect(url_for('listar_categorias'))
  except Exception as e:
    return str(e)
  finally:
    dbConn.commit()
    cursor.close()
    dbConn.close()


@app.route('/api/categorias/execute_insert_sub', methods=["POST"])
def insert_categoriasub_intoDB():
  dbConn=None
  cursor=None
  try:
    dbConn = psycopg2.connect(DB_CONNECTION_STRING)
    cursor = dbConn.cursor(cursor_factory = psycopg2.extras.DictCursor)
    query1 = "INSERT INTO categoria VALUES (%s);"
    query2 = "INSERT INTO categoria_simples VALUES (%s);"
    query3 = "INSERT INTO tem_outra VALUES (%s,%s);"
    data1 = (request.form["nome"],)
    data2 = (request.form["nome"],)
    data3 = (request.form["nome_super"],request.form["nome"],)
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
        return render_template("IVM.html", cursor=cursor)
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
        return render_template("eventos_rep.html", cursor=cursor)
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
        return render_template("retalhistas.html", cursor=cursor)
    except Exception as e:
        return str(e)
    finally:
        cursor.close()
        dbConn.close()

@app.route("/api/retalhistas/inserir")
def inserir_retalhista():
    dbConn = None
    cursor = None
    try:
        return render_template("inserir_retalhista.html")
    except Exception as e:
        return str(e)

@app.route('/api/retalhistas/execute_insert', methods=["POST"])
def insert_retalhista_intoDB():
  dbConn=None
  cursor=None
  try:
    dbConn = psycopg2.connect(DB_CONNECTION_STRING)
    cursor = dbConn.cursor(cursor_factory = psycopg2.extras.DictCursor)
    query = "INSERT INTO retalhista VALUES (%s,%s);"
    data = (request.form["tin"],request.form["nome"],)
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
        retalhista = request.args["retalhista"]
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
'''
if __name__ == "__main__":
    app.run(debug=True)


using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace reingenia.Library
{

    public static class Encryption
    {

        #region properties

        /// <summary>
        /// RSA recomienda un valor de al menos 1000
        /// </summary>
        private static int iterations = 1000;

        /// <summary>
        /// clave de encripcion
        /// </summary>
        private static byte[] password = {  0x01, 0x35, 0x40, 0x00, 0x7D, 0x2F, 0x5F, 0x00, 0x45, 0x6B, 0x51, 0x00, 0x45, 0xE7, 0xD1, 0x00,
                                            0x45, 0x24, 0x51, 0x00, 0x7D, 0xBF, 0x5F, 0x00, 0x01, 0x55, 0x40, 0x00, 0xFF, 0xA3, 0xFF, 0x80,
                                            0x60, 0x3E, 0x34, 0x00, 0xAB, 0x38, 0x45, 0x80, 0xE0, 0x42, 0x4F, 0x00, 0x97, 0xE7, 0xA0, 0x80,
                                            0xC5, 0x32, 0x42, 0x00, 0xFE, 0x9B, 0x10, 0x80, 0xDC, 0x86, 0x12, 0x00, 0xAA, 0x6E, 0x50, 0x00,
                                            0x90, 0xDC, 0x00, 0x00, 0xFF, 0x22, 0x70, 0x00, 0x01, 0x4E, 0x51, 0x00, 0x7D, 0x14, 0x72, 0x00,
                                            0x45, 0x30, 0x02, 0x00, 0x45, 0x1C, 0x04, 0x00, 0x45, 0xB4, 0xC6, 0x00, 0x7D, 0x9D, 0x5C, 0x00,
                                            0x01, 0x59, 0x63, 0x00
                                         };

        /// <summary>
        /// Prevencion de ataque por diccionario
        /// </summary>
        private static byte[] salt = { 0x56, 0x51, 0x48, 0x48, 0x57, 0x57, 0x55, 0x54, 0x54, 0x49 };

        #endregion

        #region public

        /// <summary>
        /// Retorna un arreglo de bytes desencriptado
        /// </summary>
        /// <param name="cipherData">Arreglo de bytes encriptado</param>
        /// <param name="password">Contraseña de encripcion</param>
        /// <returns>Arreglo de bytes desencriptado</returns>
        public static byte[] Decrypt(byte[] cipherData, byte[] password = null)
        {
            byte[] result = null;

            using (MemoryStream input = new MemoryStream(cipherData))
            {
                using (MemoryStream output = new MemoryStream())
                {
                    using (CryptoStream crypto = Encryption.DecryptStream(input, (password != null) ? password : Encryption.password))
                        crypto.CopyTo(output);

                    result = output.ToArray();
                }
            }

            return result;
        }

        /// <summary>
        /// Retorna el texto desencriptado de una cadena dada
        /// </summary>
        /// <param name="stCipherText">Cadena encriptada</param>
        /// <param name="password">Contraseña de encripcion</param>
        /// <returns>Texto desencriptado</returns>
        public static string Decrypt(string stCipherText, byte[] password = null)
        {
            return Encoding.Unicode.GetString(Encryption.Decrypt(Convert.FromBase64String(stCipherText), password));
        }

        /// <summary>
        /// Genera un archivo desencriptado a partir de un archivo dado
        /// </summary>
        /// <param name="stCipherFile">Ruta completa del arhivo completo</param>
        /// <param name="stClearFile">Ruta completa del archivo desencriptado a generar</param>
        /// <param name="password">Contraseña de encripcion</param>
        public static void Decrypt(string stCipherFile, string stClearFile, byte[] password = null)
        {
            using (FileStream input = new FileStream(stCipherFile, FileMode.Open, FileAccess.Read))
            {
                using (CryptoStream crypto = Encryption.DecryptStream(input, (password != null) ? password : Encryption.password))
                {
                    using (FileStream output = new FileStream(stClearFile, FileMode.OpenOrCreate, FileAccess.Write))
                        crypto.CopyTo(output);
                }
            }
        }

        /// <summary>
        /// Retorna un stream desencriptado
        /// </summary>
        /// <param name="input"></param>
        /// <param name="output"></param>
        /// <param name="password">Contraseña de encripcion</param>
        /// <returns>stream desencriptado</returns>
        public static Stream Decrypt(Stream input, Stream output, byte[] password = null)
        {
            using (CryptoStream crypto = DecryptStream(input, password ?? Encryption.password))
                crypto.CopyTo(output);

            return output;
        }

        /// <summary>
        /// Retorna la encripción de un arreglo de bytes
        /// </summary>
        /// <param name="clearData">Arreglo de bytes a encriptar</param>
        /// <param name="password">Contraseña de encripcion</param>
        /// <returns>Arreglo de bytes encriptado</returns>
        public static byte[] Encrypt(byte[] clearData, byte[] password = null)
        {
            byte[] result = null;

            using (MemoryStream input = new MemoryStream(clearData))
            {
                using (MemoryStream output = new MemoryStream())
                {
                    using (CryptoStream crypto = Encryption.EncryptStream(output, (password != null) ? password : Encryption.password))
                        input.CopyTo(crypto);

                    result = output.ToArray();
                }
            }

            return result;
        }

        /// <summary>
        /// Retorna un stream encriptado
        /// </summary>
        /// <param name="input">Stream a encriptar</param>
        /// <param name="output">Stream de salidad</param>
        /// <param name="password">Contraseña de encripcion</param>
        /// <returns>stream encriptado</returns>
        public static Stream Encrypt(Stream input, Stream output, byte[] password = null)
        {
            using (CryptoStream crypto = EncryptStream(output, password ?? Encryption.password))
                input.CopyTo(crypto);

            return output;
        }

        /// <summary>
        /// Retorna la encripción de una cadena de texto dada
        /// </summary>
        /// <param name="stClearText">Texto a encriptar</param>
        /// <param name="password">Contraseña de encripcion</param>
        /// <returns>Texto encriptado</returns>
        public static string Encrypt(string stClearText, byte[] password = null)
        {
            return Convert.ToBase64String(Encryption.Encrypt(Encoding.Unicode.GetBytes(stClearText), password));
        }

        /// <summary>
        /// Genera un archivo encriptado a partir de un archivo dado.
        /// </summary>
        /// <param name="stClearFile">Ruta completa del archivo a encriptar</param>
        /// <param name="stCipherFile">Ruta completa del archivo encriptado a generar</param>
        /// <param name="password">Contraseña de encripcion</param>
        public static void Encrypt(string stClearFile, string stCipherFile, byte[] password = null)
        {
            using (FileStream input = new FileStream(stClearFile, FileMode.Open, FileAccess.Read))
            {
                using (FileStream output = new FileStream(stCipherFile, FileMode.Create, FileAccess.Write))
                {
                    using (CryptoStream crypto = Encryption.EncryptStream(output, (password != null) ? password : Encryption.password))
                        input.CopyTo(crypto);
                }
            }
        }

        /// <summary>
        /// Genera una cadena aleatoria de 16 bytes en base 64
        /// </summary>
        /// <returns>Cadena aleatoria de 16 bytes en base 64</returns>
        public static string GenerateSalt()
        {
            byte[] buf = new byte[16];

            (new RNGCryptoServiceProvider()).GetBytes(buf);

            return Convert.ToBase64String(buf);
        }

        /// <summary>
        /// Genera el hash de un arreglo de bytes
        /// </summary>
        /// <param name="data">Datos para calcular el hash</param>
        /// <returns>Hash de los datos ingresados (SHA256)</returns>
        public static byte[] Hash(byte[] data)
        {
            HashAlgorithm hashAlg = new SHA256CryptoServiceProvider();

            return hashAlg.ComputeHash(data);
        }

        /// <summary>
        /// Genera el hash de una cadena de texto
        /// </summary>
        /// <param name="text">Cadena para calcular el hash</param>
        /// <returns>Hash de la cadena ingresada (SHA256)</returns>
        public static string Hash(string text)
        {
            return Convert.ToBase64String(Hash(Encoding.UTF8.GetBytes(text)));
        }

        #endregion

        #region private

        /// <summary>
        /// Crea un stream para decriptar en modo lectura
        /// </summary>
        /// <param name="input">Flujo de entrada</param>
        /// <param name="password">Contraseña de encripcion</param>
        /// <returns>Flujo de entrada desencriptor</returns>
        public static CryptoStream DecryptStream(Stream input, byte[] password)
        {
            return new CryptoStream(input, CreateAlgorithm(password).CreateDecryptor(), CryptoStreamMode.Read);
        }

        /// <summary>
        /// Crea un stream para encriptar en modo escritura
        /// </summary>
        /// <param name="output">Flujo de salida</param>
        /// <param name="password">Contraseña de encripcion</param>
        /// <returns>Flujo de salida encriptor</returns>
        public static CryptoStream EncryptStream(Stream output, byte[] password)
        {
            return new CryptoStream(output, CreateAlgorithm(password).CreateEncryptor(), CryptoStreamMode.Write);
        }

        /// <summary>
        /// Crea el algoritmo usado para la encriptacion simetrica
        /// </summary>
        /// <returns></returns>
        private static Rijndael CreateAlgorithm(byte[] password)
        {
            Rfc2898DeriveBytes derivate = new Rfc2898DeriveBytes(password, Encryption.salt, iterations);
            Rijndael alg = Rijndael.Create();

            alg.Key = derivate.GetBytes(32);
            alg.IV = derivate.GetBytes(16);

            return alg;
        }

        #endregion

    }

}

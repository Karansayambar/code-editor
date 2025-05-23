import { createContext, useEffect, useState } from "react";
import { v4 } from "uuid";

export const PlaygroundContext = createContext();

// const initialData = [
//   {
//     id: v4(),
//     title: "DSA",
//     files: [
//       {
//         id: v4(),
//         title: "index",
//         code: `cout<<"hello word";`,
//         language: "cpp",
//       },
//     ],
//   },
//   {
//     id: v4(),
//     title: "frontend",
//     files: [
//       {
//         id: v4(),
//         title: "test",
//         code: `console.log("hello frontend");`,
//         language: "javascript",
//       },
//     ],
//   },
// ];

export const defaultCodes = {
  ["cpp"]: `
    #include <iostream>
    using namespace std;

    int main() {
        cout << "Hello World";
        return 0;
    }
  `,
  ["java"]: `
    public class Main {
        public static void main(String[] args) {
            System.out.println("Hello World");
        }
    }
  `,
  ["javascript"]: `console.log("Hello World");`,
  ["python"]: `print("Hello World")`,
};

export const PlaygroundProvider = ({ children }) => {
  const [folders, setFolders] = useState(() => {
    const localData = localStorage.getItem("data");
    if (localData) {
      return JSON.parse(localData);
    }
    return [];
  });
  const createnewPlayground = (newPlayground) => {
    const { folderName, fileName, language } = newPlayground;
    const newFolders = [...folders];
    newFolders.push({
      id: v4(),
      title: folderName,
      files: [
        {
          id: v4(),
          title: fileName,
          code: defaultCodes[language],
          language: language,
        },
      ],
    });
    localStorage.setItem("data", JSON.stringify(newFolders));
    setFolders(newFolders);
  };

  const createNewFolder = (folderName) => {
    const newFolder = {
      id: v4(),
      title: folderName,
      files: [],
    };

    const allFolders = [...folders, newFolder];
    localStorage.setItem("data", JSON.stringify(allFolders));
    setFolders(allFolders);
  };

  const deleteFolder = (folderId) => {
    const updatedFolderList = folders.filter((folderItem) => {
      return folderItem.id !== folderId;
    });
    localStorage.setItem("data", JSON.stringify(updatedFolderList));
    setFolders(updatedFolderList);
  };

  const editFolderTitle = (newFolderName, id) => {
    const updatedFolderList = folders.map((folderItem) => {
      if (folderItem.id === id) {
        folderItem.title = newFolderName;
      }
      return folderItem;
    });

    localStorage.setItem("data", JSON.stringify(updatedFolderList));
    setFolders(updatedFolderList);
  };

  const editFileTitle = (newFileName, folderId, fileId) => {
    const copiedFolders = [...folders];
    for (let i = 0; i < copiedFolders.length; i++) {
      if (folderId === copiedFolders[i].id) {
        const files = copiedFolders[i].files;
        for (let j = 0; j < files.length; j++) {
          if (files[j].id === fileId) {
            files[j].title = newFileName;
            break;
          }
        }
        break;
      }
    }
    localStorage.setItem("data", JSON.stringify(copiedFolders));
    setFolders(copiedFolders);
  };

  const deleteFile = (folderId, fileId) => {
    const copiedFolders = [...folders];
    for (let i = 0; i < copiedFolders.length; i++) {
      if (copiedFolders[i].id === folderId) {
        const files = [...copiedFolders[i].files];
        copiedFolders[i].files = files.filter((file) => {
          return file.id !== fileId;
        });
        break;
      }
    }
    localStorage.setItem("data", JSON.stringify(copiedFolders));
    setFolders(copiedFolders);
  };

  const createPlayground = (folderId, file) => {
    const copiedFolders = [...folders];
    for (let i = 0; i < copiedFolders.length; i++) {
      if (copiedFolders[i].id === folderId) {
        copiedFolders[i].files.push(file);
        break;
      }
    }
    localStorage.setItem("data", JSON.stringify(copiedFolders));
    setFolders(copiedFolders);
  };

  const getDefaultCode = (fileId, folderId) => {
    for (let i = 0; i < folders.length; i++) {
      if (folders[i].id === folderId) {
        for (let j = 0; j < folders[i].files.length; j++) {
          const currentFile = folders[i].files[j];
          if (fileId === currentFile.id) {
            return currentFile.code;
          }
        }
      }
    }
  };

  const updateLanguage = (fileId, folderId, language) => {
    const newFolder = [...folders];
    for (let i = 0; i < newFolder.length; i++) {
      if (newFolder[i].id === folderId) {
        for (let j = 0; j < newFolder[i].files.length; j++) {
          const currentFile = newFolder[i].files[j];
          if (fileId === currentFile.id) {
            newFolder[i].files[j].code = defaultCodes[language];
            newFolder[i].files[j].language = language;
          }
        }
      }
    }
    localStorage.setItem("data", JSON.stringify(newFolder));
    setFolders(newFolder);
  };

  const getLanguage = (fileId, folderId) => {
    for (let i = 0; i < folders.length; i++) {
      if (folders[i].id === folderId) {
        for (let j = 0; j < folders[i].files.length; j++) {
          const currentFile = folders[i].files[j];
          if (fileId === currentFile.id) {
            return currentFile.language;
          }
        }
      }
    }
  };

  const saveCode = (fileId, folderId, newCode) => {
    const newFolder = [...folders];
    for (let i = 0; i < newFolder.length; i++) {
      if (newFolder[i].id === folderId) {
        for (let j = 0; j < newFolder[i].files.length; j++) {
          const currentFile = newFolder[i].files[j];
          if (fileId === currentFile.id) {
            newFolder[i].files[j].code = newCode;
          }
        }
      }
    }
    localStorage.setItem("data", JSON.stringify(newFolder));
    setFolders(newFolder);
  };

  useEffect(() => {
    if (!localStorage.getItem("data")) {
      localStorage.setItem("data", JSON.stringify(folders));
    }
  }, [folders]);

  const playgroundFeatures = {
    folders,
    createnewPlayground,
    createNewFolder,
    deleteFolder,
    editFolderTitle,
    editFileTitle,
    deleteFile,
    createPlayground,
    getDefaultCode,
    getLanguage,
    updateLanguage,
    saveCode,
  };

  return (
    <>
      <PlaygroundContext.Provider value={playgroundFeatures}>
        {children}
      </PlaygroundContext.Provider>
    </>
  );
};

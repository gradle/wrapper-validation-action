// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITODB_H
#define GITODB_H
#include <nan.h>
#include <string>
#include <queue>
#include <utility>
#include <unordered_map>
#include <sstream>

#include "async_baton.h"
#include "nodegit_wrapper.h"
#include "promise_completion.h"
#include "reference_counter.h"

extern "C" {
#include <git2.h>
}

#include "../include/typedefs.h"

#include "../include/oid.h"
#include "../include/odb_object.h"
// Forward declaration.
struct git_odb {
};

using namespace node;
using namespace v8;

class GitOdb;

struct GitOdbTraits {
  typedef GitOdb cppClass;
  typedef git_odb cType;

  static const bool isDuplicable = false;
  static void duplicate(git_odb **dest, git_odb *src) {
     Nan::ThrowError("duplicate called on GitOdb which cannot be duplicated");
   }

  static const bool isSingleton = false;
  static const bool isFreeable = true;
  static void free(git_odb *raw) {
    unsigned long referenceCount = 0;
     if (referenceCount == 0) {
      ::git_odb_free(raw); // :: to avoid calling this free recursively
    }
   }
};

class GitOdb : public
  NodeGitWrapper<GitOdbTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitOdbTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

                                      

  private:
    GitOdb()
      : NodeGitWrapper<GitOdbTraits>(
           "A new GitOdb cannot be instantiated."
       )
    {}
    GitOdb(git_odb *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitOdbTraits>(raw, selfFreeing, owner)
    {}
    ~GitOdb();
                                      
    struct AddDiskAlternateBaton {
      int error_code;
      const git_error* error;
      git_odb * odb;
      const char * path;
    };
    class AddDiskAlternateWorker : public Nan::AsyncWorker {
      public:
        AddDiskAlternateWorker(
            AddDiskAlternateBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~AddDiskAlternateWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        AddDiskAlternateBaton *baton;
    };

    static NAN_METHOD(AddDiskAlternate);

    struct ExistsPrefixBaton {
      int error_code;
      const git_error* error;
      git_oid * out;
      git_odb * db;
      const git_oid * short_id;
      bool short_idNeedsFree;
      size_t len;
    };
    class ExistsPrefixWorker : public Nan::AsyncWorker {
      public:
        ExistsPrefixWorker(
            ExistsPrefixBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~ExistsPrefixWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        ExistsPrefixBaton *baton;
    };

    static NAN_METHOD(ExistsPrefix);

    struct HashfileBaton {
      int error_code;
      const git_error* error;
      git_oid * out;
      const char * path;
      git_object_t type;
    };
    class HashfileWorker : public Nan::AsyncWorker {
      public:
        HashfileWorker(
            HashfileBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~HashfileWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        HashfileBaton *baton;
    };

    static NAN_METHOD(Hashfile);

    struct OpenBaton {
      int error_code;
      const git_error* error;
      git_odb * out;
      const char * objects_dir;
    };
    class OpenWorker : public Nan::AsyncWorker {
      public:
        OpenWorker(
            OpenBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~OpenWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        OpenBaton *baton;
    };

    static NAN_METHOD(Open);

    struct OdbReadBaton {
      int error_code;
      const git_error* error;
      git_odb_object * out;
      git_odb * db;
      const git_oid * id;
      bool idNeedsFree;
    };
    class OdbReadWorker : public Nan::AsyncWorker {
      public:
        OdbReadWorker(
            OdbReadBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~OdbReadWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        OdbReadBaton *baton;
    };

    static NAN_METHOD(OdbRead);

    struct ReadPrefixBaton {
      int error_code;
      const git_error* error;
      git_odb_object * out;
      git_odb * db;
      const git_oid * short_id;
      bool short_idNeedsFree;
      size_t len;
    };
    class ReadPrefixWorker : public Nan::AsyncWorker {
      public:
        ReadPrefixWorker(
            ReadPrefixBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~ReadPrefixWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        ReadPrefixBaton *baton;
    };

    static NAN_METHOD(ReadPrefix);

    struct WriteBaton {
      int error_code;
      const git_error* error;
      git_oid * out;
      git_odb * odb;
      const void * data;
      size_t len;
      git_object_t type;
    };
    class WriteWorker : public Nan::AsyncWorker {
      public:
        WriteWorker(
            WriteBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~WriteWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        WriteBaton *baton;
    };

    static NAN_METHOD(Write);
};

#endif

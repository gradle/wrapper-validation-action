// This is a generated file, modify: generate/templates/templates/struct_header.h

#ifndef GITTREEUPDATE_H
#define GITTREEUPDATE_H
#include <nan.h>
#include <string>
#include <queue>
#include <utility>
#include <unordered_map>

#include "async_baton.h"
#include "callback_wrapper.h"
#include "reference_counter.h"
#include "nodegit_wrapper.h"

extern "C" {
  #include <git2.h>
 }

  #include "../include/oid.h"
 
using namespace node;
using namespace v8;

class GitTreeUpdate;

struct GitTreeUpdateTraits {
  typedef GitTreeUpdate cppClass;
  typedef git_tree_update cType;

  static const bool isDuplicable = false;
  static void duplicate(git_tree_update **dest, git_tree_update *src) {
     Nan::ThrowError("duplicate called on GitTreeUpdate which cannot be duplicated");
   }

  static const bool isSingleton = false;
  static const bool isFreeable = true;
  static void free(git_tree_update *raw) {
    unsigned long referenceCount = 0;
     if (referenceCount == 0) {
      ::free(raw); // :: to avoid calling this free recursively
    }
   }
};
 class GitTreeUpdate : public NodeGitWrapper<GitTreeUpdateTraits> {
    // grant full access to base class
    friend class NodeGitWrapper<GitTreeUpdateTraits>;
  public:
    GitTreeUpdate(git_tree_update* raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>());
    static void InitializeComponent (v8::Local<v8::Object> target);

         
  private:
    GitTreeUpdate();
    ~GitTreeUpdate();

    void ConstructFields();

 
        static NAN_GETTER(GetAction);
        static NAN_SETTER(SetAction);

             Nan::Persistent<Object> id;
  
        static NAN_GETTER(GetId);
        static NAN_SETTER(SetId);

  
        static NAN_GETTER(GetFilemode);
        static NAN_SETTER(SetFilemode);

   
        static NAN_GETTER(GetPath);
        static NAN_SETTER(SetPath);

  };

#endif
